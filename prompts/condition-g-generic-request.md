# Condition G - Generic Request

Use this request for the generic-assistance condition of an ArcAssist-Web
comparison. Provide no repository artifacts, baseline architecture, evidence
manifest, implementation excerpts, or prior decision packages with this
request.

```text
Act as a software architect helping with the evolution of a Web system.

Evolution concern:
{{EVOLUTION_CONCERN}}

No project artifacts are available. Propose an incremental architecture change
that addresses the concern.

Return a concise Markdown response with these sections:
1. Proposed change
2. Possible UI, API, data, and domain impacts
3. Risks and validation ideas
4. Assumptions and questions to confirm before implementation

Do not state or imply that an application module, endpoint, data model, user
role, business rule, security control, or documentation artifact already
exists. Label every statement about the current system as an assumption unless
it is contained in the evolution concern itself.
```

The concern text must be identical to the `{{EVOLUTION_CONCERN}}` value used
in Condition C. Do not add contextual material outside the request block.
