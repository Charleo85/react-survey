import json, os
from lxml import html, etree
utf8_parser = etree.HTMLParser(encoding='utf-8')

def write_html(data, filename='sample.html'):
    with open(filename, 'wb') as f:
        et = etree.ElementTree(data)
        et.write(f)

with open('index.html', 'r', encoding='utf-8') as f:
    s = f.read()
    parser = etree.fromstring(s, parser=utf8_parser)
    # parser = html.fromstring(f.read())
    # XPATH = '//*[@class="heroGrid-postContent"]'
    # element = parser.xpath(XPATH)[0]
    # # print(element)
    # element.xpath('*//h3')[0].text('hello word')
    # XPATH = '//h3'
    # element = parser.xpath(XPATH)[0].text = 'hello world'
    write_html(parser)
