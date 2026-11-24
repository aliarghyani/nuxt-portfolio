---
title: "Beyond the Second Brain: Context Management and Independent Thinking in the AI Era"
description: "A personal exploration of AI-assisted knowledge management, preserving decision context, challenging assumptions, and retaining independent judgment."
date: "2026-11-24"
tags: ["Knowledge Management", "AI", "Context Engineering", "Decision Making", "Critical Thinking"]
author: "Ali Arghyani"
draft: false
---

For some time, I have been exploring the design of a personal system for knowledge management and decision-making. Initially, I thought I needed something like a second brain: a place to keep the things I did not want to forget.

But the more I worked with AI across different projects, the more my definition of the problem changed. I am less interested in building a comprehensive archive than in being able to follow my own reasoning over time.

This is not a report on a finished system. It is an account of the problem that led me here, the approaches I am exploring, and the questions I have not yet resolved.

## From storing information to recovering a train of thought

I use AI for software development, research, learning, and professional and personal decisions. Each of these areas has gradually accumulated conversations, analyses, sources, and decisions.

One approach I have taken is to organize different subjects into separate ChatGPT projects. I try to establish a clear purpose, instructions, and relevant information for each project.

This separation helps reduce the need to explain everything from scratch. But a more important problem remains: when I return to a project after several weeks, knowing the conclusion of the last conversation is not enough.

I want to know what problem I was facing, why I reached a particular conclusion, which alternatives I discarded, and whether the conditions underlying that decision still hold.

Finding an old conversation and reconstructing the circumstances of a decision are different problems. The former is primarily about search; the latter is about context management.

## What I mean by context

Here, I use context to mean the information needed to understand a problem or decision. This is a working definition for my personal use, not a comprehensive technical definition of a language model's context.

Suppose I have written a plan for learning a new technology. The plan tells me what to study. Its context explains why I chose that technology, what I already knew, how much time I had, and which other options I decided not to pursue.

If my available time or professional priorities change several months later, the original plan may no longer be appropriate. Keeping it is useful only if I can distinguish the assumptions that remain valid from those that no longer apply.

That is why automatically summarizing conversations is not sufficient on its own. A summary can preserve a conclusion while losing important doubts, disagreements, or conditions that shaped it.

## What software engineering brought to the problem

As a software developer, I find this problem familiar. In an earlier article, [Using Graphify as a Project Map](/blog/using-graphify-as-a-project-map), I wrote about the cost of reconstructing a mental model of a codebase and how a structured map can help with navigation.

A map helps me identify where to investigate. It does not remove the need to read the source, run tests, or evaluate an architectural decision.

Another relevant software engineering practice is the architecture decision record (ADR). In his [explanation of ADRs](https://martinfowler.com/bliki/ArchitectureDecisionRecord.html), Martin Fowler emphasizes recording the reasoning, context, and implications of a decision, while preserving the history of decisions that have been superseded.

I think this idea is worth exploring for personal decisions as well. Instead of recording only the outcome, I can keep a short note describing the problem, options, assumptions, and reasoning behind my choice. If I change my mind later, the new decision should not erase the earlier history.

## The system I am currently exploring

I am experimenting with ways to separate projects, record decisions, and transfer relevant context between them. I do not want to commit to a specific tool or architecture before I understand what I actually need.

My current conceptual model has four parts:

- **Primary sources:** notes, documents, and conversations that I can revisit when necessary.
- **Current project state:** objectives, constraints, completed work, open questions, and the next step.
- **Decision history:** choices, rationales, assumptions, and conditions that should trigger reconsideration.
- **Retrieval and analysis:** AI-assisted discovery of relevant information, summarization, comparison of viewpoints, and identification of potential inconsistencies.

Keeping these separate matters to me. An AI-generated interpretation should not automatically become a recorded fact or an accepted decision. Nor does every project need access to all the information in another project. Relevance and privacy should determine what crosses those boundaries.

### A small example of a decision record

The following is an illustrative design, not a claim that I have implemented a complete system.

- Problem: choosing a learning plan for a particular subject.
- Options: independent study, a structured course, or practice through a real project.
- Assumptions: available time, existing knowledge, and the learning objective.
- Decision and rationale: the option that best fits the current circumstances.
- Reconsideration trigger: a change in objectives, time constraints, or evidence that the approach is not effective.

When I retrieve this record later, AI can help me compare the original circumstances with the present ones. Accepting or revising the decision, however, should remain deliberate.

## Offloading memory or offloading thinking?

Using tools to reduce mental effort is not new. Writing notes, setting reminders, and using calendars all transfer some cognitive demands to the external environment. In their 2016 review, [Cognitive Offloading](https://doi.org/10.1016/j.tics.2016.07.002), Evan Risko and Sam Gilbert examine the mechanisms and consequences of this behavior.

What makes AI different for my purposes is that the tool does more than retain information. It can interpret it, construct arguments, and propose solutions.

In a study published at CHI 2025, Lee and colleagues surveyed 319 knowledge workers who reported 936 examples of using generative AI at work. Greater confidence in AI was associated with lower reported critical-thinking effort. The researchers also identified a shift in critical-thinking activities toward verifying information, integrating responses, and overseeing tasks. The [original study](https://doi.org/10.1145/3706598.3713778) relies on participants' reports of their experience; it does not establish that AI causes a decline in critical-thinking ability.

For me, that raises a design question: does my personal system merely make answers easier to obtain, or does it also help me evaluate the quality of my own judgment?

::pull-quote{highlight}
I want a system that helps me think better without gradually handing over the responsibility of thinking.
::

For consequential decisions, I would prefer to record my initial view before consulting AI. I can then ask the model to challenge my assumptions, identify counterevidence, propose alternatives, and explain where information is missing. Finally, I should be able to articulate and record the rationale for my own decision.

This is not necessary for every routine task. Writing an ordinary email does not require an elaborate decision process. The cost of verification should be proportionate to the significance and consequences of the decision.

## How would I know whether the system actually helps?

I do not yet have data demonstrating that my current approach is better over the long term. The criteria I want to examine in future experiments are practical:

- How long does it take to regain enough context to make a decision when I return to an old project?
- Can I reconstruct the reasoning behind a decision from its original sources?
- Does the system surface outdated or conflicting assumptions?
- Can I explain the reasoning behind my final decision without depending on the model's answer?
- Is the effort required to maintain the system becoming greater than the value it provides?

If maintaining the system becomes a project that consumes more of my time than it saves, I have probably lost sight of the original problem.

## Where I stand

I still do not know what the final version of this system will look like. Parts of it may remain in my existing tools; other parts may require a different workflow or software.

What is clearer to me now is that having more memory is not enough. When I revisit a past decision, I want to be able to understand it and, when the evidence changes, to think about it again independently.

For anyone exploring personal knowledge management or using AI to support decisions, this is the question I am most interested in: how do you preserve your past reasoning without sacrificing the freedom to reconsider it?
