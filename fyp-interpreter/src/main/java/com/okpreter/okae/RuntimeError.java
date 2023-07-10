// This code is adapted from craftinginterpreter and goes through step by step with the book

package com.okpreter.okae;

public class RuntimeError extends RuntimeException {
  final Token token;

  RuntimeError(Token token, String message) {
    super(message);
    this.token = token;
  }
}
