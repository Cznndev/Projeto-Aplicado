use async_graphql::{http::GraphiQLSource, EmptyMutation, EmptySubscription, Object, Schema}
use axum::{response::{Html, Intoresponse}, 
    rounting::get, 
    Extension, Router,

};

use async_graphql_axum::GraphQL;

pub struct QueryRoot;

