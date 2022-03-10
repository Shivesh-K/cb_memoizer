const template = [
    "#include <bits/stdc++.h>",
    "using namespace std;",
    "",
    "int main() {",
    "",
    "}"
];

const getCode = () => {
    let lines = template;
    if (localStorage.getItem(`${window.parent.location.href}`))
        lines = JSON.parse(localStorage.getItem(`${window.parent.location.href}`));
    return lines.join('\n');
}

const saveCode = (code) => {
    localStorage.setItem(`${window.parent.location.href}`, JSON.stringify(code.split('\n')));
}


new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (!mutation.addedNodes || mutation.addedNodes.length == 0)
            return;
        mutation.addedNodes.forEach((newNode) => {
            if (newNode.classList && newNode.classList[0] === 'monaco-editor' && window.editor) {
                if (!window.editor)
                    return;
                editor.setValue(getCode());
                editor.onDidChangeModelContent(() => {
                    saveCode(editor.getValue())
                })
            }
        })
    })
}).observe(document.body, {
    subtree: true,
    childList: true,
})
