export function removeSortingInfo(groupId: string) {
  return (groupId || '').replace(/^\d+-/, '');
}

export function queryGroupElementsById(groupId: string) {
  const elements = document.querySelectorAll(
    `[data-group-id$="-${groupId}"]`
  ) as any;
  const matchingElements: HTMLElement[] = [];

  elements.forEach((element: HTMLElement) => {
    const foundGroupId = element?.dataset?.groupId || '';
    const validGroupRegex = new RegExp(`^\\d+-${groupId}$`);

    if (validGroupRegex.test(foundGroupId)) {
      matchingElements.push(element);
    }
  });

  return matchingElements;
}
