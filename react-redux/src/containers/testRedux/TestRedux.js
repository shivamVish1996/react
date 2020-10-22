import React, { Component } from "react";
import { connect } from "react-redux";

import * as actionCreators from "../../store/actions/counter/actionCreators";
import * as characterActionTypes from "../../store/actions/character/actionTypes";

import Spinner from "../../components/spinner/spinner";

class TestRedux extends Component {
  render() {
    let loading = null;
    if (this.props.loading) {
      loading = <Spinner />;
    }

    let error = null;
    if (this.props.error) {
      error = "something went wrong";
    }

    return (
      <div>
        {loading}

        <div className="row">
          <div className="col">
            <h1>Test Counter</h1>
            <hr />
            <h2>{this.props.counter}</h2>
            <button
              className="btn btn-outline-primary"
              onClick={this.props.increment}
            >
              Increment
            </button>{" "}
            <button
              className="btn btn-outline-primary"
              onClick={this.props.decrement}
            >
              Decrement
            </button>{" "}
            <button
              className="btn btn-outline-primary"
              onClick={this.props.add}
            >
              Add 5
            </button>
            {" "}
            <button
              className="btn btn-outline-primary"
              onClick={this.props.get}
            >
              Get counters
            </button>
          </div>

          <div className="col">
            <h1>Test character</h1>
            <hr />
            <h2>{this.props.character}</h2>
            <button
              className="btn btn-outline-primary"
              onClick={this.props.displayA}
            >
              displayA
            </button>{" "}
            <button
              className="btn btn-outline-primary"
              onClick={this.props.displayB}
            >
              displayB
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <button
              className="btn btn-outline-primary"
              onClick={() => this.props.save(this.props.counter)}
            >
              Save Counter
            </button>
          </div>
          <div className="col">
            <button
              className="btn btn-outline-primary"
              onClick={this.props.displayB}
            >
              Save Character
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col">Result status: {error}</div>
          <div className="col">Counters: {this.props.counters}</div>
          <div className="col">Result status: </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    counter: state.counterReducer.counter,
    error: state.counterReducer.error,
    loading: state.counterReducer.loading,
    counters: state.counterReducer.counters,
    character: state.characterReducer.character,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    increment: () => dispatch(actionCreators.increment()),
    decrement: () => dispatch(actionCreators.decrement()),
    add: () => dispatch(actionCreators.add(5)),
    save: (counter) => dispatch(actionCreators.save(counter)),
    get: () => dispatch(actionCreators.get()),
    displayA: () => dispatch({ type: characterActionTypes.DISPLAY_A }),
    displayB: () => dispatch({ type: characterActionTypes.DISPLAY_B }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TestRedux);
