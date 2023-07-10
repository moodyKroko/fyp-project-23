// This code is adapted from craftinginterpreter and goes through step by step with the book

package com.okpreter.okae;

import java.util.List;public interface LoxCallable {
  int arity();
  Object call(Interpreter interpreter, List<Object> arguments);
}
