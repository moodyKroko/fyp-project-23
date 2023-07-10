// This code is adapted from craftinginterpreter and goes through step by step with the book

package com.okpreter.okae;

public class Return extends RuntimeException {
  final Object value;

  Return(Object value) {
    super(null, null, false, false);
    this.value = value;
  }
}
