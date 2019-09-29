#![feature(proc_macro_hygiene, decl_macro)]
#![feature(plugin, custom_attribute)]

extern crate dotenv;
extern crate hyper;
extern crate pretty_env_logger;

#[macro_use]
extern crate log;

#[macro_use]
extern crate serde_derive;

use std::env;
use hyper::{Body, Request, Response, Server, Method, StatusCode, header, Client, HttpConnector};
use hyper::service::{make_service_fn, service_fn};

type GenericError = Box<dyn std::error::Error + Send + Sync>;
type Result<T> = std::result::Result<T, GenericError>;

enum LockType {
    string = 0x00,
    int = 0x01,
    float = 0x02,
    collection = 0x03,
}

struct App {
    db: rocksdb::DB,

    // App state params
    volumes: &[&str],
    fallback: &str,
    replicas: u8,
    subvolumes: u8,
    proct_entries: bool,
}

///

fn get_or_else<T>(vec: &[T], default: T, index: u8) -> Option<T> {
    if (vec.get(index).is_none()) {
        Some(default)
    }

    vec.get(index)
}

async fn remove_slash(uri: &str) -> &str {
    uri.chars().next().map(|c| &s[c.len_utf8()..]).unwrap_or("")
}

async fn route_not_found(req: Request<Body>) -> &[u8] {
    format!("Route: {} not found, sorry!", req.uri().path()).as_bytes()
}

async fn handle_request(
    req: Request<Body>,
    client: Client<HttpConnector>
) -> Result<Response<Body>> {
    match (req.method(), req.uri().path)) {
        _ => {
            // Return 404 not found
            Ok(Response::builder()
               .status(StatusCode::NOT_FOUND)
               .body(route_not_found(req).into())
               .unwrap())
        }
    }
}

async fn main() ->  Result<()> {
    dotenv().ok();

    pretty_env_logger::init();

    let pkg_name = env!("CARGO_PKG_NAME");
    let pkg_version = env!("CARGO_PKG_VERSION");

    let args = env::args().collect();
    let host: String = get_or_else<String>(&args, "localhost", 1);
    let port: String = get_or_else<String>(&args, "5001", 2);

    let addr = host.push_str(port);

    let client = Client::new();

    let platinum_service = make_service_fn(move |_| {
        // Clone client so the lifetime exists past moved instance
        let client = client.clone();
        async {
            Ok::<_, GenericError>(service_fn(move |req| {
                // Clone again so it exists outside of closure
                handle_request(req, client.to_owned())
            }))
        }
    });

    let server = Server::bind(&addr)
        .serve(platinum_service);

    println!("{} v{} running on: {}", pkg_name, pkg_version, addr);

    server.await?;

    Ok(())
}
