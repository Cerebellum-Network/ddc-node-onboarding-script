#!/usr/bin/env node
import { CGX } from './cgx'
/* eslint-disable */
const clear = require('clear')

clear()
export function index(): Promise<void> {
	return CGX()
}

index()
