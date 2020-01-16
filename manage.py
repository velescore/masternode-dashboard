#!/usr/bin/env python3
"""
Runs tasks related to the web application life-cycle

Copyright (C) 2020 The Veles Core developers
Author:     Altcoin Baggins
Project:    Veles Core Masternode
Package:    Masternode Dashboard

This program is free software: you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation, either version 3
of the License, or (at your option) any later version.
"""
import os
import argparse

from app.builder import DashboardPageBuilder

# Basic commandline interface
def main():
    package_dir = os.path.dirname(os.path.realpath(__file__))
    parser = argparse.ArgumentParser(description='Dashboard WebApp management for Veles Masternode')

    parser.add_argument('--path', default=package_dir,
        help='path to the masternode-dashboard package base directory')
    parser.add_argument('action', 
        help='supported actions: rebuild')
    parser.add_argument('page', nargs='?',
        help='page name to manage, needed for "rebuild" action')
    args = parser.parse_args()

    # Sanity check for the path argument
    if not os.path.exists(args.path):
        raise ValueError('invalid --path: path does not exist: {}'.format(args.path))

    elif not os.path.isdir(args.path):
        raise ValueError('invalid --path: not a directory: {}'.format(args.path))

    elif not os.path.isdir(os.path.join(args.path, 'templates')):
        raise ValueError('invalid --path: not a masternode-dashboard base directory: {}'.format(args.path))

    # Actions
    if args.action == 'rebuild':
        if not args.page:
            raise ValueError('action "rebuild" requires second positional argument [page]')

        builder = DashboardPageBuilder(args.path)
        builder.build(args.page)

    else:
        raise ValueError('unsupported action: {}'.format(args.action))

if __name__=='__main__':
    #try:
    main()
    #except ValueError as e:
    #    print(os.path.basename(__file__) + ': error: {}'.format(str(e)))
