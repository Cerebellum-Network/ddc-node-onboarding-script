#!/usr/bin/env node
import  { CGX } from './cgx';

export function index(): Promise<any> {
  return CGX();
}

index().then(r => console.log(r));
