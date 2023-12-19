export function replaceChildren(parentNode: Element, newChild: Element) {
  if (parentNode.replaceChildren) {
    return parentNode.replaceChildren(newChild);
  }

  parentNode.innerHTML = '';
  parentNode.append(newChild);
}
