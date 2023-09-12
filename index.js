// ==UserScript==
// @name         Refined Github Commit Rewind
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Make World Better！
// @author       Konv Suu
// @license      MIT
// @match        https://github.com/**
// @icon         https://cdn0.iconfinder.com/data/icons/data-analytics-orchid-vol-2/256/Reverse_Engineering-128.png
// @grant        none
// ==/UserScript==

(function () {
  'use strict'

  function reverseTimelineItems() {
    const timeline = document.querySelector('.js-navigation-container.js-active-navigation-container.mt-3')
    const timelineItems = timeline.querySelectorAll('.TimelineItem.TimelineItem--condensed')
    timeline.innerHTML = ''
    const timelineItemsArr = Array.from(timelineItems).reverse()

    timelineItemsArr[0].classList.remove('pt-2')
    timelineItemsArr[0].classList.add('pt-0')
    timelineItemsArr[timelineItemsArr.length - 1].classList.add('pt-2')

    timelineItemsArr.forEach((item) => {
      reverseCommits(item.querySelector('.Box.Box--condensed'))
      timeline.appendChild(item)
    })
  }

  function reverseCommits(timeline) {
    const commitItems = timeline.querySelectorAll('.Box-row.Box-row--focus-gray.js-commits-list-item.js-navigation-item')
    timeline.innerHTML = ''
    const commitItemsArr = Array.from(commitItems).reverse()
    commitItemsArr.forEach((item) => {
      timeline.appendChild(item)
    })
  }

  function append() {
    const container = document.querySelector('.file-navigation')
    const reverseBtn = document.createElement('button')
    reverseBtn.classList.add('btn', 'mt-2')
    reverseBtn.innerText = 'Reverse'
    reverseBtn.addEventListener('click', () => {
      reverseTimelineItems()
    })
    container.appendChild(reverseBtn)
  }

  function run() {
    if (location.href.startsWith('https://github.com/') && location.href.split('/').includes('commits'))
      append()
  }

  run()

  // listen to github page loaded event
  document.addEventListener('pjax:end', () => run())
  document.addEventListener('turbo:render', () => run())
})()
