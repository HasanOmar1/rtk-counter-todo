import React from "react";
import { BtnContainer, Button, Main } from "./CounterStyle";
import { useSelector, useDispatch } from "react-redux";
import {
  decreaseByFive,
  decreaseByOne,
  increaseByFive,
  increaseByOne,
} from "../../slices/CounterSlice";

export default function Counter() {
  const counter = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();
  return (
    <Main>
      <h1>{counter}</h1>

      <BtnContainer>
        <Button $green onClick={() => dispatch(increaseByOne())}>
          increase By 1
        </Button>
        <Button $cyan onClick={() => dispatch(increaseByFive(5))}>
          increase By 5
        </Button>
        <Button $red onClick={() => dispatch(decreaseByOne())}>
          decrease By 1
        </Button>
        <Button $pink onClick={() => dispatch(decreaseByFive(5))}>
          decrease By 5
        </Button>
      </BtnContainer>
    </Main>
  );
}
