export function getChapters(HTML: HTMLCollection, extractor: any) {
  const chaptersArr: any[] = [];
  const titles = Array.from(HTML).forEach(ele => {
    const chapterObj = extractor(ele)
    chaptersArr.push(chapterObj)
  });
  return chaptersArr
}