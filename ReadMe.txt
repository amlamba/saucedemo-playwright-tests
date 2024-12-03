Not currently testing for lockout as unlocking mechanisms are currently unknown.
Similarly, no test cases added for session timeout, expired passwords as the current implementation does not seem to have these feature implemented.
Tests for the inventory page covers all users instead of just problem_user for greater depth, but skips the footer for brevity.
A lot of the paths other than the happy path have been skipped. This again was to ensure brevity.

Throughout the tests, parameterisation was used. It is very easily possible to also run the same tests on the same users using a csv, a path that was skipped for simplicity.
