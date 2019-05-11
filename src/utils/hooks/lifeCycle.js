import { useState, useEffect, useMemo } from 'react';

export {
  useDidMount,
  useWillUnmount,
}

function useDidMount(func) {
  useMemo(() => void func(), []);
}

function useWillUnmount(func) {
  useEffect(() => func, []);
}