// This code is adapted from craftinginterpreter and goes through step by step with the book

package com.okpreter.okae;

import java.util.Objects;

/** A Token class that tracks where the error occurs in a line. */
final class Token {

  final TokenType type;
  final String lexeme;
  final Object literal;
  final int line;

  /**
   * @param type {@code TokenType} a type of token which determines if its keywords or characters
   * @param lexeme {@code String}
   * @param literal {@code Object}
   * @param line {@code int} shows which line the error is in
   */
  Token(TokenType type, String lexeme, Object literal, int line) {
    this.type = type;
    this.lexeme = lexeme;
    this.literal = literal;
    this.line = line;
  }

  @Override
  public String toString() {
    return "Token: {"
        + "type: "
        + type
        + ", lexeme: '"
        + lexeme
        + '\''
        + ", literal: "
        + literal
        + '}';
  }
}
