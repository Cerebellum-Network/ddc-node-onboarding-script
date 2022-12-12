#!/usr/bin/env node
import { CGX } from './cgx'
const clear = require('clear')

clear()
export function index(): Promise<any> {
	return CGX()
}

index().then((r) => console.log(r))
