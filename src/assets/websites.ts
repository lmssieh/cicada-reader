import { Readability } from "@mozilla/readability";
import { useDepromosify } from "../components/useDepromisify";
import { getChapters, awaitForEle, getText } from "../utils";

interface website {
  name: string; // location.host
  run: () => {
    title: string;
    text: string;
    prev: string;
    next: string;
    chapters: {
      title: string,
      url: string
    };
  }
}

interface websitesType {
  [url: string]: website
}

interface contentType {
  title: () => string;
  body: () => string;
}

interface Ichapters {
  title: string,
  url: string
}

export const websites: websitesType = {
  'novelfull.com': {
    name: 'box novel',
    run(d = document) {
      async function customGetChapters() {
        (d.querySelector('button.chapter_jump') as HTMLButtonElement)?.click();
        await awaitForEle("#chapter-nav-top select");
        const chaptersEle = d.querySelector("#chapter-nav-top select")?.children;
        const extractor = (ele: HTMLElement) => ({
          title: ele.textContent,
          url: (ele as HTMLSelectElement).value
        })
        return getChapters(chaptersEle, extractor)
      }

      return {
        title: d.querySelector(".chapter-title")?.title,
        text: getText('#chapter-content', d),
        prev: d.querySelector('#prev_chap')?.href,
        next: d.querySelector('#next_chap')?.href,
        chapters: useDepromosify(customGetChapters())
      }
    }
  },
  'secondlifetranslations.com': {
    name: 'second life translations',
    run() {
      const chapters: Ichapters[] = [];
      const chaptersEle = document.querySelector("#mesrz > div.srzselectp > select").children;
      [...chaptersEle].forEach(ele => {
        chapters.push({
          title: ele.textContent,
          url: ele.value
        })
      })
      return {
        title: document.querySelector("article > a")?.textContent,
        text: getText('.entry-content.clr'),
        prev: document.querySelector('.srznavliprev a')?.href,
        next: document.querySelector('.srznavlinext a')?.href,
        chapters: chapters
      }
    }
  },
  'novelhall.com': {
    name: 'novel hall',
    run(d = document) {
      return {
        title: d.querySelector('.single-header h1')?.textContent,
        text: getText('#htmlContent'),
        prev: d.querySelector('.nav-single a:first-child'),
        next: d.querySelector('.nav-single a:last-child'),
        chapters: []
      }
    }
  }
}
