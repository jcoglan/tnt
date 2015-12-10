# tnt(1)

`tnt` is an interactive proof assistant for [Typographical Number
Theory](https://en.wikipedia.org/wiki/Typographical_Number_Theory), as described
in [Gödel, Escher,
Bach](https://en.wikipedia.org/wiki/G%C3%B6del,_Escher,_Bach). It helps you
carry out proofs while making sure you only stick to the rules of the system.

In a formal system like this, it's easy to accidentally apply things you know
about maths to your derivations. For example, you may see a theorem like `(a +
0) = b` and, knowing what "adding zero" means, conclude that `a = b` is a
theorem. But this is thinking "outside the system" rather than strictly
following the system's rules. This program stops you from making errors like
this.


## Installation

```
$ git clone git://github.com/jcoglan/tnt.git
$ cd tnt
$ npm install
$ make
```


## Usage

To start, run `./bin/tnt` from this directory. This initiates an interactive
shell from where you can issue commands to produce proofs. You can list the
available commands, see the set of theorems you've derived so far, and enter
commands to derive new ones.

You run a command by typing its name, followed by any arguments it takes
separated by spaces. When you want to refer to an existing theorem, you do so by
its number. For example, here is a session listing with the commands shown on
the right:

```
     1    [                           (push)
     2        a = b                   (premise a = b)
     3        Sa = Sb                 (add_succ 2)
     4        Sb = Sa                 (symmetry 3)
     5    ]                           (pop)
     6    ⟨a = b ⊃ Sb = Sa⟩           (fantasy 2 4)
```

Almost all theorem-generating commands are only allowed to use theorems from the
current scope. The only exceptions are `carry_over`, which can use theorems from
the parent scope, and `fantasy`, which requires two theorems from the same child
scope.


### Theorem syntax

The syntax of terms and formulas is described in the following tables. We use
Unicode mathematical symbols where appropriate, but each such symbol has an
ASCII equivalent too.  Theorems are made of two kinds of expressions: *terms*
and *formulas*. A complete theorem must be a valid formula, not a bare term.

| Term      | Description                                     |
| --------- | ----------------------------------------------- |
| zero      | `0`                                             |
| variable  | `a` to `z`                                      |
| successor | `S` followed by a term                          |
| sum       | `(` term `+` term `)`                           |
| product   | `(` term `*` term `)`, or `(` term `⋅` term `)` |

| Formula   | Description                                                  |
| --------- | ------------------------------------------------------------ |
| atom      | term `=` term                                                |
| negation  | `~` or `∼`, followed by a formula                            |
| and       | `<` formula `&` formula `>`, or `⟨` formula `∧` formula `⟩`  |
| or        | `<` formula `|` formula `>`, or `⟨` formula `∨` formula `⟩`  |
| implies   | `<` formula `->` formula `>`, or `⟨` formula `⊃` formula `⟩` |
| exists    | `E` or `∃`, followed by: variable `:` formula                |
| forall    | `A` or `∀`, followed by: variable `:` formula                |

Two commands, `premise` and `specification`, allow you to add completely new
terms that you write yourself, and those terms must conform to this syntax.

One command, `double_tilde`, allows you to manipulate *formulas* within a
theorem.  One command, `existence`, lets you extract *terms* from a theorem and
replace them with a variable.


### Axioms

There are five built-in theorems in Typographical Number Theory. Typing `axiom`
lists them for you:

```
     1    ∀a: ∼ Sa = 0
     2    ∀a: (a + 0) = a
     3    ∀a: ∀b: (a + Sb) = S(a + b)
     4    ∀a: (a ⋅ 0) = 0
     5    ∀a: ∀b: (a ⋅ Sb) = ((a ⋅ b) + a)
```

To use an axiom, you need to import it into your list of theorems. You do this
by typing `axiom n` where `n` is between `1` and `5` inclusive.


### Commands

The following table lists all the commands in `tnt`. Every theorem you generate
must be derived somehow from the axioms via these commands.

| Command                 | Description                                                                                                                                                                                         |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `commands`              | Lists all the available commands                                                                                                                                                                    |
| `ls`                    | Displays the theorems you've proven so far, with their number and the command used to produce them                                                                                                  |
| `undo [n]`              | Removes the last theorem from the list, or all the theorems after `n` if given                                                                                                                      |
| `axiom [n]`             | Lists the built-in axioms, or if `n` is given, imports axiom N into your theorem list                                                                                                               |
| `push`                  | Begins a new fantasy scope                                                                                                                                                                          |
| `premise p`             | Invents a premise in the current fantasy; `p` can be any syntactically valid theorem string, e.g. `premise ~ Sa = (a + b)`                                                                          |
| `pop`                   | Ends the current fantasy and returns to the parent scope                                                                                                                                            |
| `joining s t`           | Generates the theorem `⟨s ∧ t⟩`                                                                                                                                                                     |
| `separation t n`        | Given a theorem `t` of the form `⟨p ∧ q⟩`, generates `p` if `n` is `1` and `q` if `n` is `2`                                                                                                        |
| `double_tilde t [n]`    | Adds or removes `∼ ∼` from formula `n` within `t`; if `n` is not given, it lists the formulas within `t`                                                                                            |
| `fantasy s t`           | Given premise `s` and derived theorem `t` from a child scope, generates `⟨s ⊃ t⟩`                                                                                                                   |
| `carry_over t`          | Imports theorem `t` from the parent scope into the current one                                                                                                                                      |
| `detachment p t`        | Given theorems `p`, and `t` of the form `⟨p ⊃ q⟩`, generates `q`                                                                                                                                    |
| `contrapositive t`      | Converts `t` of the form `⟨p ⊃ q⟩` into `⟨∼ q ⊃ ∼ p⟩` and vice versa                                                                                                                                |
| `de_morgan t`           | Converts `t` of the form `⟨∼ p ∧ ∼ q⟩` into `∼ ⟨p ∨ q⟩` and vice versa                                                                                                                              |
| `switcheroo t`          | Converts `t` of the form `⟨p ∨ q⟩` into `⟨∼ p ⊃ q⟩` and vice versa                                                                                                                                  |
| `generalization t a`    | Generates `∀a: t` if variable `a` is a free variable in `t`                                                                                                                                         |
| `specification t s`     | Given a theorem `t` of the form `∀a: p`, replaces all occurrences of variable `a` in `p` with the term `s`, e.g. `specialization 1 S(a + b)`                                                        |
| `interchange t`         | Converts `t` of the form `∀a: ∼ p` into `∼ ∃a: p` and vice versa                                                                                                                                    |
| `existence t v [n ...]` | Replaces one or more instances of the same term in `t` with variable `v`; if no `n` is given it lists the terms in `t`                                                                              |
| `symmetry t`            | Converts `t` of the form `x = y` into `y = x`                                                                                                                                                       |
| `transitivity s t`      | Given `s` of the form `x = y` and `t` of the form `y = z`, generates `x = z`                                                                                                                        |
| `add_succ t`            | Converts `t` of the form `x = y` into `Sx = Sy`                                                                                                                                                     |
| `drop_succ t`           | Converts `t` of the form `Sx = Sy` into `x = y`                                                                                                                                                     |
| `induction s t`         | Given `s` of the form `∀a: ⟨p ⊃ q⟩`, generates `∀a: p` if `q` is equal to `p` after replacing all instances of `a` with `Sa`, and `t` is equal to `p` after replacing all instances of `a` with `0` |


## License

Copyright (C) 2015 James Coglan

This program is free software: you can redistribute it and/or modify it under
the terms of the GNU General Public License as published by the Free Software
Foundation, either version 3 of the License, or (at your option) any later
version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY
WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A
PARTICULAR PURPOSE.  See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with
this program.  If not, see <http://www.gnu.org/licenses/>.
