"""
Compiles templates and saves resulted page to static file

Copyright (C) 2020 The Veles Core developers
Author:     Altcoin Baggins
Project:    Veles Core Masternode
Package:    Masternode Dashboard

This program is free software: you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation, either version 3
of the License, or (at your option) any later version.
"""
import os, json, codecs

from app.view import DashboardIndexView

class DashboardPageBuilder(object):
    """ Constructor, needs base path of website """
    def __init__(self, path, tpl_extension = 'tpl', page_extension = 'html'):
        self.path = path
        self.tpl_extension = tpl_extension
        self.page_extension = page_extension

    def save_result(self, page, result):
        with codecs.open('{}.{}'.format(os.path.join(self.path, 'public', page), self.page_extension), 'w', 'utf-8') as fh:
            fh.write(result)

    def load_static_vars(self, path):
        if os.path.isfile(path):
            with open(path, 'r') as json_file:
                data = json_file.read()

            return json.loads(data)
        else:
            print('DashboardPageBuilder: Warning: static variable file not found: {}'.format(path))
            return {}

    def build(self, page = 'index', variables = {}):
        # Variables given are actually extras,
        # use variables.json as default anyway
        tpl_vars = self.load_static_vars(os.path.join(self.path, 'variables.json'))
        tpl_vars.update(variables)

        if page == 'index':
            view = DashboardIndexView(os.path.join(self.path, 'templates'))
            result = view.render(tpl_vars)
            self.save_result(page, result)
            print('{}.{}'.format(os.path.join('public', page), self.page_extension))

        else:
            raise ValueError('unknown page: {}'.format(page))
