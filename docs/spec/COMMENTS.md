# MDL Comments

MDL line comments start with `//`.

```mdl
// This is emitted as an HTML comment
page:
  // This comment is nested in the page output
  hero:
    ## Welcome
```

Output:

```html
<!-- This is emitted as an HTML comment -->
<main class="mdl-page">
  <!-- This comment is nested in the page output -->
  <div class="mdl-hero">
    <h2>Welcome</h2>
  </div>
</main>
```

Comments are structural MDL nodes, so `mdl format` keeps them and normalizes them
to the current indentation level.

Inside `script js:` blocks, JavaScript owns the source and `//` remains a normal
JavaScript comment.
