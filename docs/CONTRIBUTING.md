# Contributing to Skipjack<!-- omit in toc -->

:tada: Welcome! :tada: We're glad you're here and thankful for your interest in contributing to Skipjack.

Consistent with Under Armour's Core Values, we encourage all contributors to _create fearlessly_ and _think beyond_. Contributions to Skipjack of all shapes and sizes are valuable and desired. See the [table of contents](#table-of-contents) for a better understanding of how you may help and details about how this project manages itself!

Please make sure to read the relevant sections before making your contribution! It will make it a lot easier to accept your contribution and streamline the experience for all involved. 💚

[Our team](#collaborators) looks forward to your contributions. 🙌🏾

## Table of Contents<!-- omit in toc -->

- [Agreements](#agreements)
  - [Code of Conduct](#code-of-conduct)
- [Discuss](#discuss)
  - [Request Support](#request-support)
  - [Report a Defect](#report-a-defect)
  - [Request a Feature](#request-a-feature)
- [Contribute](#contribute)
  - [Contribute Documentation](#contribute-documentation)
  - [Contribute Code](#contribute-code)
  - [Submit a Pull Request](#submit-a-pull-request)
  - [Provide Support on Issues](#provide-support-on-issues)
- [Manage](#manage)
  - [Label Issues](#label-issues)
  - [Clean Up Issues and PRs](#clean-up-issues-and-prs)
  - [Review Pull Requests](#review-pull-requests)
  - [Merge Pull Requests](#merge-pull-requests)
- [Reference](#reference)
  - [Project Setup](#project-setup)
  - [Project Structure](#project-structure)
  - [Development Workflow](#development-workflow)
  - [Collaborators](#collaborators)

# Agreements

## Code of Conduct

All contributors are expected to understand and implicitly agree to our Code of Conduct before participating in any contribution activities. Please make sure you've read through it.

- [Code of Conduct](./CODE_OF_CONDUCT.md)

# Discuss

## Request Support

If you have a question about this project, how to use it, or just need clarification about anything, the best venue is [#skipjack on Slack](https://uacf.slack.com/archives/CQNKL9LK0). Otherwise;

- [Open a new issue](https://github.com/ua-digital-commerce/skipjack/issues)
- Provide as much context as is relevant about what you're experiencing or are lacking

Once it's opened:

- The project team will [label the issue](#label-issues).
- Someone from the team, or other contributors, will respond, as available.

> **Note:** We do not have an established service-level agreement (SLA) for issue response or resolution. We strive to reduce friction for all contributors but it's possible your issue lingers without a response. If you need to draw extra attention to your issue, please mention @ua-digital-commerce/skipjack in a comment with context or [join #skipjack on Slack](https://uacf.slack.com/archives/CQNKL9LK0).

[Back to top](#table-of-contents)

## Report a Defect

If you run into an error or confusing behavior with the project:

- [Submit a Defect Report](https://github.com/ua-digital-commerce/skipjack/issues?template=DEFECT_REPORT.md)
- Include as much information possible for the requested sections, especially _steps to reproduce_
  - If your issue is presenting during development, please add additional project and platform versions (docker, nodejs, npm, dependencies, etc), depending on what may be relevant.

Once it's opened:

- The project team will [label the issue](#label-issues).
- Someone from the team will try to reproduce the issue with your provided steps.
  - If there are no reproduction steps or no obvious way to reproduce the issue, the team will ask you for those steps and mark the issue as `needs repro`. Defect reports with the `needs repro` tag will not be addressed until they are reproduced.
  - If the team is able to reproduce the issue, it will be marked `needs repro`.
- After reproduction and labeling, the team will attempt to schedule it for resolution. Many factors contribute to where we can focus our efforts, the fastest route to resolution is usually by [contributing a solution](#contribute-code)

> **Note:** We do not have an established service-level agreement (SLA) for issue response or resolution. We strive to reduce friction for all contributors but it's possible your issue lingers without a response. If you need to draw extra attention to your issue, please mention @ua-digital-commerce/skipjack in a comment with context or [join #skipjack on Slack](https://uacf.slack.com/archives/CQNKL9LK0).

[Back to top](#table-of-contents)

## Request a Feature

Whether you have a great idea or the platform doesn't work just the way you need or want it to:

- [Submit a Feature Request](https://github.com/ua-digital-commerce/skipjack/issues?template=FEATURE_REQUEST.md)
- Include as much information possible for the requested sections
  - Please try and be clear about why existing features and alternatives are not work for you.

Once it's opened:

- The project team will [label the issue](#label-issues).
- The project team will evaluate the feature request, possibly asking follow-up questions to better understand its purpose and any relevant requirements.
  - If the feature request is accepted, it will be marked for implementation with `accepted`, which can then be done by either by a core team member or by anyone in the community who wants to [contribute code](#contribute-code).
  - If the issue is not accepted, the team will convey their reasoning, [label it](#label-issues) appropriately and, if possible, suggest an alternative path forward.

> **Note:** We do not have an established service-level agreement (SLA) for issue response or resolution. We strive to reduce friction for all contributors but it's possible your issue lingers without a response. If you need to draw extra attention to your issue, please mention @ua-digital-commerce/skipjack in a comment with context or [join #skipjack on Slack](https://uacf.slack.com/archives/CQNKL9LK0).

[Back to top](#table-of-contents)

# Contribute

## Contribute Documentation

Documentation is a super important, critical part of this project. Docs are how we keep track of what we're doing, how, and why. And it's how we tell others everything they need in order to be able to use this project -- or contribute to it. So thank you in advance.

Documentation contributions of any size are welcome! Feel free to file a PR even if you're just rewording a sentence to be more clear, or fixing a spelling mistake!

To contribute documentation:

- [Set up the project](#project-setup).
- Edit or add any relevant documentation.
- Make sure your changes are formatted correctly and consistently with the rest of the documentation.
- Re-read what you wrote, and run a spellchecker on it to make sure you didn't miss anything.
- Write clear, concise commit message(s) including a ticket reference or prepend it with `NOJIRA`.
- [Submit a Pull Request](#submit-a-pull-request)

Once you've opened the PR:

- Barring special circumstances, maintainers will not review PRs until all checks pass (CircleCi, GitHub Actions, etc).
- One or more members of the team will use GitHub's review feature to review your PR.
- If the reviewer asks for any changes, edit your changes, push, and request another review.
- When your PR gets accepted, you can then [merge it](#merge-a-pull-request) into the target branch at your earliest convenience.
- In the rare event a reviewer decides to pass on your PR, they will thank you for the contribution and explain why the changes won't be accepted. That's ok! We still really appreciate you taking the time to do it, and we don't take that lightly. 💚

[Back to top](#table-of-contents)

## Contribute Code

We like code commits a lot! They're super handy, and they keep the project going and doing the work it needs to do to be useful to others.

Code contributions of just about any size are acceptable!

The main difference between code contributions and documentation contributions is that contributing code requires inclusion of relevant tests for the code being added or changed. Contributions without accompanying tests will be held off until adequate testing is added, unless the maintainers considers the specific tests to be either impossible, or the value would be minimal for such a contribution.

To contribute code:

- [Set up the project](#project-setup).
- Make any necessary changes to the source code.
- Write tests that verify that your contribution works as expected.
- Include any [additional documentation](#contribute-documentation) the changes might need.
- Write clear, concise commit message(s) including a ticket reference or prepend it with `NOJIRA`.
- [Submit a Pull Request](#submit-a-pull-request)

Once you've submitted the PR:

- Barring special circumstances, maintainers will not review PRs until all checks pass (CircleCi, GitHub Actions, etc).
- One or more members of the team will use GitHub's review feature to review your PR.
- If the reviewer asks for any changes, edit your changes, push, and request another review.
- When your PR gets accepted, you can then [merge it](#merge-a-pull-request) into the target branch at your earliest convenience.
- In the rare event a reviewer decides to pass on your PR, they will thank you for the contribution and explain why the changes won't be accepted. That's ok! We still really appreciate you taking the time to do it, and we don't take that lightly. 💚

[Back to top](#table-of-contents)

## Submit a Pull Request

Pull Requests are used as a way to maintain a historical discussion of each change made to the repository. They are a form of living documentation but also where we perform code reviews and automated checks. The more effort invested during the submission process, the greater the likelihood of acceptance without follow-up requests.

Contributors are encouraged to make use of the [Draft Pull Request](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/about-pull-requests#draft-pull-requests) feature on GitHub as soon as they begin working on a documentation or code change. This is helpful to all by both broadcasting the intent to contribute changes and as a place to prepare commits and comments before submitting for review.

- Navigate to [Pull Requests](https://github.com/ua-digital-commerce/skipjack/pulls)
- Click the _New pull request_ button or open an existing [Draft PR](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/about-pull-requests#draft-pull-requests)
  - If necessary, click the _compare across forks_ link
- Select the repository/branch to pull from (right side)
  - If necessary, select the target repository/branch for the request (left side)
- Check the comparison and confirm these are the changes you'd like to have pulled into the project
- Click _Create pull request_ button
- Add a terse but descriptive title, including a ticket reference or prepend it with NOJIRA
- Fill out the [Pull Request Template](./PULL_REQUEST_TEMPLATE.md)
  - If your PR is connected to an open issue, add a line in your PR's description that says `Fixes: #123`, where `#123` is the number of the issue you're fixing.
- Click _Create pull request_ to submit it and do a 💃 dance 🕺 to celebrate 🍾

[Back to top](#table-of-contents)

## Provide Support on Issues

[Requires Collaborator](#collaborators): [@ua-digital-commerce/engineering](https://github.com/orgs/ua-digital-commerce/teams/engineering)

Anyone with access to the repository can help out other users with their questions and is a really
awesome way of contributing to Skipjack. If you decide to help out on an issue, be sure to assign
it to yourself

In order to help other folks out with their questions:

- Go to the issue tracker and [filter open issues by the `support` label](https://github.com/ua-digital-commerce/skipjack/issues?q=is%3Aopen+is%3Aissue).
- Read through the list until you find something that you're familiar enough with to provide an answer on.
- Respond to the issue with as much detail as needed to clarify the question, or get more details about what's going on.
- Once the discussion wraps up and things are clarified, either close the issue, or ask the original issue filer (or a maintainer) to close it for you.

Some notes on picking up support issues:

- Avoid responding to issues you don't know you can answer accurately.
- As much as possible, try to refer to past issues with accepted answers. Link to them from your replies with the `#123` format.
- Be kind and patient with each other -- often, folks who have run into confusing things might be upset or impatient. This is ok. Try to understand where they're coming from, and if you're too uncomfortable with the tone, feel free to stay away or withdraw from the issue. (note: if the user is outright hostile or is violating the CoC, [refer to the Code of Conduct](./CODE_OF_CONDUCT.md) to resolve the conflict).

[Back to top](#table-of-contents)

# Manage

## Label Issues

[Requires Collaborator](#collaborators): [@ua-digital-commerce/engineering](https://github.com/orgs/ua-digital-commerce/teams/engineering)

One of the most important tasks in handling issues is labeling them usefully and accurately. All other tasks involving issues ultimately rely on the issue being classified in such a way that relevant parties looking to do their own tasks can find them quickly and easily.

In order to label issues, [open up the list of unlabeled issues](https://github.com/ua-digital-commerce/skipjack/issues?q=is%3Aopen+is%3Aissue+no%3Alabel) and, _from oldest to newest_, read through each one and apply issue labels according to the table below. If you're unsure about what label to apply, skip the issue and try the next one: don't feel obligated to label each and every issue yourself!

| Label       | Apply When                                                                                                                                                                                                                                                                   | Notes                                                                                                                                                                                   |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `accepted`  | Added to feature request issues that have been accepted by the team for implementation.                                                                                                                                                                                      | The team will close accepted issues when pulling them into their delivery backlog                                                                                                       |
| `debt`      | Added to issues which the contributor(s) have identified as technical debt. | These issues are used to capture the desired implementation of the contributor (or core team) which was forfeited to meet deadlines or other temporal objectives but which should be completed at a future opportunity. |
| `defect`    | Added to issues where the code (or documentation) is behaving in a way that it wasn't intended to.                                                                                                                                                                           | Consider converting the issue to a feature request when the reported behavior _surprises the user_ but adheres the intent of the design.                                                |
| `deferred`  | Used by the team to label feature request issues that have not been closed but are not ready for implementation at this time.                                                                                                                                                | Primarily used for feature requests the team think are good but are otherwise not able to support, at this time. Issues with this label may be locked after an extended period of time. |
| `docs`      | Added to issues or pull requests that affect any of the documentation for the project.                                                                                                                                                                                       | This is mostly used to indicate that no functional changes have been requested or made.                                                                                                 |
| `duplicate` | Added to issues or pull requests that refer to the exact same issue as another one that's been previously labeled.                                                                                                                                                           | Duplicate issues should be marked and closed right away, with a message referencing the issue it's a duplicate of (with `#123`)                                                         |
| `feature`   | Added to Feature Requests automatically upon submission | This label helps identify new feature requests and should be applied to other issues, if it would result in a new feature added to Skipjack |
| `help`      | Added to Support Requests automatically upon submission | This label is used to quickly identify requests for support and should be applied to other issues, if the context implies help from collaborators is needed to resolve it. |
| `refactor`  | Added to issues or pull requests that deal with cleaning up or modifying the project for the betterment of it without changing how it currently functions.                                                                                                                   | This label is most commonly applies to Pull Requests which resolve a Technical Debt ticket but may be applied to any which include significant refactors to exisiting functionality.                                                                                                                                                                                         |
| `starter`   | Added to issues the team consider good introductions to the project for people who have not contributed before. These are generally narrow in context and low priority.                                                                                                      | The team will generally try to avoid these unless they increase in priority.                                                                                                            |
| `triage`    | Added to issues automatically upon submission                                                                                                                                                                                                                                | Remove this once the ticket has been validated, labeled and a response has been delivered.                                                                                              |
| `tests`     | Added to issues or pull requests which primarily address testing the project.                                                                                                                                                                                                | It's most likely to be seen paired with the `refactor` label.                                                                                                                           |
| `wontfix`   | Used by the team to label issues that clearly have nothing at all to do with the project or are otherwise entirely outside of its scope/sphere of influence. It may be applied when and closing an issue or PR if a decision to pass on an otherwise relevant issue is made. | The issue or PR should be closed as soon as the label is applied, and a clear explanation provided of why the label was used.                                                           |

[Back to top](#table-of-contents)

## Clean Up Issues and PRs

[Requires Collaborator](#collaborators): [@ua-digital-commerce/engineering](https://github.com/orgs/ua-digital-commerce/teams/engineering), [@ua-digital-commerce/product](https://github.com/orgs/ua-digital-commerce/teams/product)

At the pace of modern software development, Issues and PRs can become stale after a while. Maybe they're abandoned. Maybe they are no longer relevant. Maybe the core team does not have time to address them.

In these cases, they might be worth closing until they're brought up again or until the interaction starts over. Closing a ticket is a temporary state and does not mean it isn't worth reopening or resuming discussion.

To clean up issues and PRs:

- Search the issue tracker for issues or PRs, and add the term `updated:<=YYYY-MM-DD`, where the date is 90 days before today.
- Go through each issue _from oldest to newest_, and close them if **all of the following are true**:
  - not opened by a core team member
  - not marked as `triage` or `accepted`
  - not marked as `starter` (these might stick around for a while, in general, as they're intended to be available)
  - no explicit messages in the comments asking for it to be left open
- Leave a message when closing saying "Cleaning up stale issue. Please reopen or ping us if and when you're ready to resume this. See https://github.com/ua-digital-commerce/skipjack/blob/master/docs/CONTRIBUTING.md#clean-up-issues-and-prs for more details."

[Back to top](#table-of-contents)

## Review Pull Requests

[Requires Collaborator](#collaborators): [@ua-digital-commerce/skipjack](https://github.com/orgs/ua-digital-commerce/teams/skipjack/)

While anyone can and should comment, or add feedback, PRs are currently only able to be _approved_ for merging by the [Skipjack core team](#team-skipjack).

PR reviews use [GitHub's own review feature](https://help.github.com/articles/about-pull-request-reviews/), which manages comments, approval, and review iteration.

Some notes:

- **Reviewing code is work** and provides significant value to the project.
- _ALL PULL REQUESTS_ should be reasonably covered by test(s) comprehensive enough to explain the purpose and useage of the affected code.
- All tests must pass and follow established conventions. Test coverage should not drop, unless the specific case is considered reasonable by the reviewer.
- Please make sure you're familiar with the code or documentation being updated, unless it's a minor change (spellchecking, minor formatting, etc). You may @mention another project member who you think is better suited for the review, but still provide a non-approving review of your own.
- Be extra kind: people who submit code/doc contributions are putting themselves in a pretty vulnerable position, and have put time and care into what they've done (even if that's not obvious to you!) -- always respond with respect, be understanding, but don't feel like you need to sacrifice your standards for their sake, either. Just don't be a jerk about it? 💜
- Be sure to ask for as much or as little additional information or explanation required to understand the intent and mechanics of the changes submitted, considering narrow and wide impacts of the change.
- It is encouraged to suggest alternatives or provide extra information about how the solution could change. However, unless specific security, performance, or process concerns are involved the requestor shouldn't feel pressured to change their request.
- You may ask for minor changes ("nitpicks"), but consider whether they are really blockers to merging: try to err on the side of "approve, with comments".

[Back to top](#table-of-contents)

## Merge Pull Requests

- Ensure the pull request is rebased to ensure a clean and linear change history.
   - Commits made after a pull request has been approved will not require a new review.
- When merging, prefer the [_Squash and Merge_](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/about-pull-request-merges#squash-and-merge-your-pull-request-commits) strategy, preserving as few commits as necessary to describe the changes.
- If a critical defect is found after merging, it is recommended to fix-forward, when possible, over reverting changes.

[Back to top](#table-of-contents)

# Reference

## Project Setup

So you wanna contribute some changes?! That's great. This project uses GitHub Pull Requests to manage contributions, so [read up on how to fork a GitHub project](https://guides.github.com/activities/forking) and [clone a repository](https://help.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository), if you've never done it before. Any member of [@ua-digital-commerce/engineering](https://github.com/orgs/ua-digital-commerce/teams/engineering) is empowered to branch directly within this repository and should be sure to delete the branch after merging.

If this seems like a lot or you aren't able to do all this setup, you might also be able to [edit the files directly](https://help.github.com/articles/editing-files-in-another-user-s-repository/) without having to do any of this setup. Yes, [even code](#contribute-code).

**Pre-requisites:**

- [Install Node.js >= v12.x](https://nodejs.org/en/download/)
- [Fork the project](https://guides.github.com/activities/forking/#fork) (optional)
- [Clone the repository](https://help.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository)

Then in your terminal:

- `cd skipjack`
- `npm install`
- `npm test`

And you should be ready to go! Be sure to check out the [Project Reference](./PROJECT_REFERENCE.md) to better understand the structure of the repository.

[Back to top](#table-of-contents)

## Project Structure

- [Project Structure](./PROJECT_REFERENCE.md#project-structure)

[Back to top](#table-of-contents)

## Development Workflow

- [Development Workflow](./PROJECT_REFERENCE.md#development-workflow)

[Back to top](#table-of-contents)

## Collaborators

### Team Skipjack<!-- omit in toc -->

**The Core Team**

- [@ua-digital-commerce/skipjack](https://github.com/orgs/ua-digital-commerce/teams/skipjack/)

[Back to top](#table-of-contents)

### Connected Commerce<!-- omit in toc -->

**GitHub Teams**

- [@ua-digital-commerce/engineering](https://github.com/orgs/ua-digital-commerce/teams/engineering/)
- [@ua-digital-commerce/product](https://github.com/orgs/ua-digital-commerce/teams/product/)

[Back to top](#table-of-contents)

## Attribution<!-- omit in toc -->

This guide was heavily influenced by the WeAllJS `CONTRIBUTING.md` generator. [Make your own](https://npm.im/weallcontribute)!

[Back to top](#table-of-contents)
