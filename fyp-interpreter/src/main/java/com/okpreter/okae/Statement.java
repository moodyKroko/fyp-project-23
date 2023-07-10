// This code is adapted from craftinginterpreter and goes through step by step with the book

package com.okpreter.okae;

import com.okpreter.okae.Expression.Variable;
import java.util.List;

abstract class Statement {

  abstract <R> R accept(Visitor<R> visitor);

  interface Visitor<R> {
    R visitBlockStatement(Block statement);

    R visitClassStatement(Class statement);

    R visitExpressionStatement(Expr statement);

    R visitFunctionStatement(Function statement);

    R visitIfStatement(If statement);

    R visitPrintStatement(Print statement);

    R visitReturnStatement(Return statement);

    R visitVarStatement(Var statement);

    R visitWhileStatement(While statement);
  }

  static class Block extends Statement {
    final List<Statement> statements;

    Block(List<Statement> statements) {
      this.statements = statements;
    }

    @Override
    <R> R accept(Visitor<R> visitor) {
      return visitor.visitBlockStatement(this);
    }
  }

  static class Class extends Statement {
    final Token name;
    final Expression.Variable superclass;
    final List<Statement.Function> methods;

    Class(Token name, Variable superclass, List<Statement.Function> methods) {
      this.name = name;
      this.superclass = superclass;
      this.methods = methods;
    }

    @Override
    <R> R accept(Visitor<R> visitor) {
      return visitor.visitClassStatement(this);
    }
  }

  static class Expr extends Statement {
    final Expression expr;

    Expr(Expression expression) {
      this.expr = expression;
    }

    @Override
    <R> R accept(Visitor<R> visitor) {
      return visitor.visitExpressionStatement(this);
    }
  }

  static class Function extends Statement {
    final Token name;
    final List<Token> params;
    final List<Statement> body;

    Function(Token name, List<Token> params, List<Statement> body) {
      this.name = name;
      this.params = params;
      this.body = body;
    }

    @Override
    <R> R accept(Visitor<R> visitor) {
      return visitor.visitFunctionStatement(this);
    }
  }

  static class If extends Statement {
    final Expression condition;
    final Statement thenBranch;
    final Statement elseBranch;

    If(Expression condition, Statement thenBranch, Statement elseBranch) {
      this.condition = condition;
      this.thenBranch = thenBranch;
      this.elseBranch = elseBranch;
    }

    @Override
    <R> R accept(Visitor<R> visitor) {
      return visitor.visitIfStatement(this);
    }
  }

  static class Print extends Statement {
    final Expression expression;

    Print(Expression expression) {
      this.expression = expression;
    }

    @Override
    <R> R accept(Visitor<R> visitor) {
      return visitor.visitPrintStatement(this);
    }
  }

  static class Return extends Statement {
    final Token keyword;
    final Expression value;

    Return(Token keyword, Expression value) {
      this.keyword = keyword;
      this.value = value;
    }

    @Override
    <R> R accept(Visitor<R> visitor) {
      return visitor.visitReturnStatement(this);
    }
  }

  static class Var extends Statement {
    final Token name;
    final Expression initializer;

    Var(Token name, Expression initializer) {
      this.name = name;
      this.initializer = initializer;
    }

    @Override
    <R> R accept(Visitor<R> visitor) {
      return visitor.visitVarStatement(this);
    }
  }

  static class While extends Statement {
    final Expression condition;
    final Statement body;

    While(Expression condition, Statement body) {
      this.condition = condition;
      this.body = body;
    }

    @Override
    <R> R accept(Visitor<R> visitor) {
      return visitor.visitWhileStatement(this);
    }
  }
}
