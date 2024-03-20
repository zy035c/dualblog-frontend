import React, { Component } from "react";
import PrimeList from "./prime_list";

export default class Home extends Component {


    render() {
        return (
            <div>
                <h2>Home</h2>
                <PrimeList />
            </div>
        );
    }
}