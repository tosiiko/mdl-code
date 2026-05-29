# UI Patterns

MDL can describe common UI patterns as named sections. CSS owns the visual
presentation, and JavaScript owns state changes such as opening, closing, or
switching.

## Toast

```mdl
toast@id(savedToast)@aria-live(polite):
  Saved.
```

Output uses a normal element with a predictable class:

```html
<div class="mdl-toast" id="savedToast" aria-live="polite">
  <p>Saved.</p>
</div>
```

## Modal

```mdl
modal@id(confirmModal):
  panel:
    ## Confirm
    .btn-secondary@click(closeModal)(Close)
```

`modal:` maps to `<dialog class="mdl-modal">`.

## Drawer

```mdl
drawer@id(helpDrawer):
  ## Help
  Drawer content.
```

`drawer:` maps to `<aside class="mdl-drawer">`.

## Tabs

```mdl
tabs@id(settingsTabs):
  tablist@role(tablist):
    .btn-secondary@click(showProfile)(Profile)
    .btn-ghost@click(showBilling)(Billing)
  tab@id(profileTab)@data-state(active):
    Profile content.
  tab@id(billingTab):
    Billing content.
```

The compiler does not hide or switch tab panels by itself. The page CSS and
JavaScript decide which `.mdl-tab` is active.
