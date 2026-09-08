// Ported from test/tangy-photo-capture_test.html (web-component-tester) by scratchpad/port-wct-tests.js.
// Assertions are the originals, unchanged. Only the fixture plumbing is new.
import { fixture, registerFixture, installFixtureTeardown, assert } from './karma-fixture.js';

registerFixture('TangyPhotoCaptureFixture', `
<tangy-photo-capture 
          name="test_image" 
          label="
            <t-lang en>English label</t-lang>
            <t-lang fr>French label</t-lang>
          "
          error-text="
            <t-lang en>English error-text</t-lang>
            <t-lang fr>French error-text</t-lang>
          "
          hint-text="
            <t-lang en>English hint-text</t-lang>
            <t-lang fr>French hint-text</t-lang>
          "
          question-number="1."
          allow-blank
          required
        ></tangy-photo-capture>
`);

import '../input/tangy-photo-capture.js'
      suite('tangy-photo-capture', () => {
    installFixtureTeardown();

        [
          "#image", 
          "#accept-button", 
          "#clear-button", 
          "#capture-button"
        ].forEach( elementId => {
          test(`Should load ${elementId}`, function() {
            const element = fixture('TangyPhotoCaptureFixture');
            assert.isNotNull(element.shadowRoot.querySelector(elementId))
          })
        })

        test('should resume image if value exists', () => {
          const element = fixture('TangyPhotoCaptureFixture');
          element.value = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAmADIDASIAAhEBAxEB/8QAGwAAAgMBAQEAAAAAAAAAAAAAAAYEBQcCAwH/xAAyEAACAQMDAgQEAwkAAAAAAAABAgMEBREAEiEGMQcTQVEiYXGxMnKBFSNSkaHB0eHw/8QAGgEAAgMBAQAAAAAAAAAAAAAABAUAAwYBAv/EACQRAAEEAQQBBQEAAAAAAAAAAAEAAgMRBAUSITFBBhMUI1GB/9oADAMBAAIRAxEAPwBXslsqFgVaja+RlWUjt8x6f31cLbSOw50yU1ilpblSRzhxDUwllYMCilcZGccd/fTHTdPQzkIk8TP/AAmT/hrNtyHXZRro6WeCiOPw6U+uLw9rghpbYY3uNQ21VBBKD6e5OAP11rd1ttPTxzgSxiRFYcHODj76xHwv6aa83SrrKx/OaB+AAdxfvu+ePbTnS4xlyUTwEDlyexGXVa+yt1d0tGlbf6YVNAOZAjK7KPmR2+2tTtlE1zstHco1MVvwkzsy87WxjI+pxql6sNeLNJReZHIuHV2khzJgAcd8Y5Pcar+ir7W3Lw8hjk8xIqVzSrtzidVAbefy5251PUOCI2h8fk0uYE5k4cr17nVI7JFUusanCjC8D09NGl4ynJyTo1mPjP8A1MtwTr0k1RWzWungXbSXGSYTNI3IjU4DBQeeQffTNc5Lx0vVXpbbVUMcEEURV27/ABMBlgfTGcfPXn4OSq15tML026aktoiWbaQsbsWdx+u7GdN3i1cFTp2rimpaV3JXDPKoLgZPAJycHHHfnto6OHdCT5B4FKsuG8D9We3m7SU1PLM9Kk1SKjZJhThvhBz341n/AETc5qfqa+wyRR08Tt5sUKJsC5yePv8Az1EvfVt1nqJmiDUsdQ251iGMeg57++qS2XCKWpmMvmRzs25XyQ2R2O73+utFpWmS4v2ucOukrzMtkv1tH9TLc57rGs5neKaaZDHEkabWJcgctzkeufkdTZUhtlgo6Gj+Cnp1MQy3f1yT7kjSB1DXztUU/nVJeVXDgxpswe2Tt9efvr3ourJ6ciO4wiqiU5YlcMCPUeh/XVms4kuXtezoeFMSdkZIPlXbud7fXRqGKyGQb0cbG+IZ44OjSHZXaY2Ey+FvWNqsl2kqas3WbgcBY27duMgajeJvi9J1Dc0pLdHP5avhTVJGNufkv+dGjVrY2/J21wF4s+3az+pucmyRZyFcnP7mMAahQ14eUrlwDnJ2gk/10aNPIHG6S+UCrXcs3nZy5ynY7MH76rprjJCoY/hY4476NGipeRyqou13+0yeS7Z/L/vRo0aWI9f/2Q=="
          assert(element.shadowRoot.querySelector("img").getAttribute("src") == element.value)
        })

      })
