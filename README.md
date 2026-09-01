# Harry Brearley Poem Machine

A small interactive poem website made with plain HTML, CSS, and JavaScript. It is ready for VS Code and GitHub Pages—no framework, installation, or build step required.

## Open it on your computer

1. Download and unzip the project folder.
2. Open VS Code.
3. Choose **File → Open Folder…** and select `poem-machine`.
4. Double-click `index.html` in the left sidebar.
5. For the easiest live preview, install the **Live Server** VS Code extension, then right-click `index.html` and choose **Open with Live Server**.

You can also double-click `index.html` in Finder to open it directly in Safari.

## What each file does

- `index.html` contains the poem, buttons, and marked adjective/noun words.
- `style.css` contains the colors, layout, tie-dye background, butterflies, and animations.
- `script.js` contains adjective shuffling, N+ noun replacement, Reset, and Chaos Mode.

## Easy first edits

- Change the page colors at the very top of `style.css` under `:root`.
- Add or remove words from `nounDictionary` near the top of `script.js`.
- Change the Chaos Mode speed by editing `1800` in `window.setInterval(chaosBeat, 1800)`.
- Add the poet's name or a custom credit inside the `<footer>` in `index.html`.

## Add a GIF later

1. Create an `images` folder inside `poem-machine`.
2. Drag a GIF into it—for example, `sparkle.gif`.
3. Add this line somewhere just after the opening `<body>` tag in `index.html`:

```html
<img class="my-gif" src="images/sparkle.gif" alt="">
```

4. Add this to `style.css` and adjust it however you like:

```css
.my-gif {
  position: fixed;
  right: 20px;
  bottom: 20px;
  width: 140px;
  z-index: 6;
}
```

## Put it on GitHub Pages

Create a new GitHub repository, upload these files to the repository's top level, and turn on GitHub Pages under **Settings → Pages → Deploy from a branch → main / root**.

Keep the filename `index.html`: GitHub Pages looks for that name automatically.
