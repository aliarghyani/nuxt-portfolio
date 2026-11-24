---
title: "Beyond the Second Brain: Context Management and Independent Thinking in the AI Era"
description: "A personal exploration of AI-assisted knowledge management, preserving decision context, challenging assumptions, and retaining independent judgment."
date: "2026-11-24"
tags: ["Knowledge Management", "AI", "Context Engineering", "Decision Making", "Critical Thinking"]
author: "Ali Arghyani"
draft: false
---

I've been working on a personal system for managing knowledge and making decisions. You could probably call it a second brain.

At first, I thought that bringing my scattered information and conversations together and making them easy to find would solve a good part of the problem.

But there's something I'm still struggling with. Imagine coming back to a project after a few weeks. You find the old conversation and see what you decided, but you can't quite remember why you made that choice or why you ruled out the alternatives.

That's the problem I'm trying to solve.

## Why finding old conversations isn't enough

I use AI for software development, research, learning, career decisions, and even some aspects of my personal life. Over time, each of those areas has accumulated a lot of conversations, analysis, resources, and decisions.

One thing I've done is organize different subjects into separate ChatGPT projects. I try to give each one a clear purpose, instructions, and information relevant to that particular area.

It helps because I don't have to explain everything from scratch every time. But when I return to a project after a while, I'm usually looking for more than the answer to my last question.

I want to remember what problem I was dealing with, why I reached a particular conclusion, which options I ruled out, and whether my original assumptions still hold.

That's where context management starts to matter to me.

## What do I mean by context?

Say you've made a plan to learn a new technology. You still have the document, and it tells you exactly what to study.

But why did you choose that technology in the first place? How much time did you have? What were you hoping to achieve? What else did you decide to put aside?

Those details are part of the context behind your decision. If your career priorities or available time change a few months later, the plan might need to change too. It's harder to judge the old plan without knowing what led you to it.

That's what I mean by context here: the information that helps us understand a problem or decision in its original circumstances, rather than a technical definition of a language model's context.

It's also why I don't think AI-generated conversation summaries are enough on their own. A summary might accurately capture what I decided but leave out the part of the discussion that made me change my mind.

## How this relates to my experience in software engineering

In an earlier article, [Using Graphify as a Project Map](/blog/using-graphify-as-a-project-map), I wrote about a similar problem in software development. When I come back to a codebase after some time away, I spend part of my time figuring out its structure and how the different pieces fit together again.

Having a map helps me find my way around. I still need to read the code, run tests, and evaluate architectural decisions.

There's another useful idea in software engineering: architecture decision records, or ADRs. In his [explanation of ADRs](https://martinfowler.com/bliki/ArchitectureDecisionRecord.html), Martin Fowler discusses recording the context, reasoning, and consequences of decisions, along with keeping a history of earlier decisions.

I think there's something worth borrowing from that practice for decisions outside software development. I don't need to write a lengthy document for every personal choice. Sometimes a few lines about the problem, the alternatives, and my reasoning might be enough.

If I change my mind later, I'd like to understand why I thought differently at the time, rather than simply replacing the old decision with a new one.

## What I'm thinking of building

I haven't settled on a final system yet. I'm trying different ways of separating projects, recording decisions, and moving relevant context between them. I'm not even sure whether I need new software for this.

Right now, I'm thinking about four parts:

- **Original sources:** notes, documents, and conversations that I can go back to when needed.
- **Current project state:** what am I trying to achieve, where am I now, what are the constraints, and what's next?
- **Decision history:** what did I decide, why, and when should I reconsider it?
- **Retrieval and analysis:** using AI to find relevant information, compare viewpoints, and spot possible inconsistencies.

What matters to me here is that an AI-generated interpretation doesn't get mistaken for a fact or a decision I've actually made. I also don't want every project to have access to everything in every other project. Relevance and privacy should determine what gets shared.

### A small example of a decision record

Going back to the example of learning a new technology, I might only need to record a few things:

- Problem: I want to learn a particular subject.
- Options: independent study, taking a course, or learning through a practical project.
- Assumptions: my available time, current knowledge, and learning objective.
- Choice: which approach did I choose, and why?
- When to revisit it: what change in circumstances or new evidence would make me reconsider?

This is just an example of something I'd like to try. I haven't worked out how much detail to keep for each decision so that the record is useful later without taking too much time to maintain.

## Offloading memory or offloading thinking?

Every time we write something down or set a reminder, we're transferring some of our mental workload to an external tool. Cognitive psychology studies this under the term cognitive offloading. Evan Risko and Sam Gilbert explore its mechanisms and consequences in their 2016 review, [Cognitive Offloading](https://doi.org/10.1016/j.tics.2016.07.002).

What's different for me about using AI is that, unlike a notebook, it can interpret the information, build an argument, and even suggest what decision I should make.

At CHI 2025, Lee and colleagues published a study involving 319 knowledge workers who reported 936 examples of using generative AI in their work.

One finding that caught my attention was that greater confidence in AI was associated with lower reported critical-thinking effort. The researchers also observed a shift in the kind of effort involved, toward checking information, integrating responses, and overseeing tasks.

Of course, [the study](https://doi.org/10.1145/3706598.3713778) relies on people's reports of their own experiences. It doesn't establish that AI causes a decline in critical-thinking ability.

But it leaves me with a question: if I build a system that makes getting an answer really easy, how do I make sure I'm still thinking about that answer myself?

::pull-quote{highlight}
I want a system that helps me think better without gradually handing over the responsibility of thinking.
::

For important decisions, one approach I'd like to try more often is writing down my initial view before consulting AI. Then I can ask it to challenge my assumptions, bring up other perspectives, and point out what information I'm missing.

I don't see any reason to do this for every routine task. I'm not going to interview myself before writing an ordinary email! The amount of scrutiny should depend on what's at stake.

## How will I know if this is actually useful?

I don't have data yet showing that my current approach works better in the long run. But there are a few questions I'd like to answer as I keep experimenting:

- When I return to an old project, how long does it take before I can make an informed decision again?
- Can I recover the reasoning behind a decision from the original sources?
- Does the system help me spot outdated or conflicting assumptions?
- Can I explain why I made my final decision without looking at the AI's answer?
- How much time am I spending on maintaining the system itself?

That last one matters quite a bit to me. I don't want to create another project to manage all my projects, only to find that it's taking up more time than the others.

## I'm still figuring it out

I don't know what the final setup will look like. I might be able to do most of this with the tools I already use, or I might need a different approach for some parts.

What has changed since I started is that I'm no longer just looking for a bigger memory. When I revisit a decision I made a few months ago, I'd like to understand my reasoning and, if necessary, reconsider it without being attached to my earlier choice.

I'm genuinely curious how others who've built personal knowledge management systems or use AI regularly for decision-making deal with this. How do you preserve the reasoning behind your past decisions without letting those decisions restrict how you think today?
