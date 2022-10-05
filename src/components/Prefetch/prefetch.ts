/**
 * Portions copyright 2018 Google Inc.
 * Inspired by Gatsby's prefetching logic, with those portions
 * remaining MIT. Additions include support for Fetch API,
 * XHR switching, SaveData and Effective Connection Type checking.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/
import { canPrefetch } from './utils'
import { isClient } from '/@/utils/is'

const preFetched = {}

/**
 * Checks if a feature on `link` is natively supported.
 * Examples of features include `prefetch` and `preload`.
 * @param {string} feature - name of the feature to test
 * @return {Boolean} whether the feature is supported
 */
function support(feature: string): boolean {
  if (!isClient)
    return false

  const link = document.createElement('link')
  return link?.relList?.supports(feature)
}

/**
 * Fetches a given URL using `<link rel=prefetch>`
 * @param {string} url - the URL to fetch
 * @return {Object} a Promise
 */
function linkPrefetchStrategy(url: string): Promise<unknown> {
  return new Promise((resolve, reject) => {
    const link = document.createElement('link')
    link.rel = 'prefetch'
    link.href = url

    link.addEventListener('load', resolve)
    link.addEventListener('error', reject)

    document.head.appendChild(link)
  })
}

/**
 * Fetches a given URL using XMLHttpRequest
 * @param {string} url - the URL to fetch
 * @return {Object} a Promise
 */
function xhrPrefetchStrategy(url: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const req = new XMLHttpRequest()

    req.open('GET', url, (req.withCredentials = true))

    req.addEventListener('load', () => {
      // eslint-disable-next-line prefer-promise-reject-errors
      req.status === 200 ? resolve() : reject()
    })

    req.send()
  })
}

/**
 * Fetches a given URL using the Fetch API. Falls back
 * to XMLHttpRequest if the API is not supported.
 * @param {string} url - the URL to fetch
 * @return {Object} a Promise
 */
function highPriFetchStrategy(url: string): Promise<unknown> {
  return Reflect.has(window, 'fetch')
    ? fetch(url, { credentials: 'include' })
    : xhrPrefetchStrategy(url)
}

const supportedPrefetchStrategy = support('prefetch') ? linkPrefetchStrategy : xhrPrefetchStrategy

/**
 * Prefetch a given URL with an optional preferred fetch priority
 * @param url - the URL to fetch
 * @param isPriority - if is "high" priority
 */
function prefetcher(url: string, isPriority?: boolean) {
  if (!canPrefetch || preFetched[url])
    return

  return (isPriority ? highPriFetchStrategy : supportedPrefetchStrategy)(url).then(() => {
    preFetched[url] = true
  })
}

export default prefetcher
