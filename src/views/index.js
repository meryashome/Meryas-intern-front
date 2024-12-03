import React, { useState, useEffect,Fragment } from 'react'


//prism
import '../../node_modules/prismjs/prism';
import '../../node_modules/prismjs/themes/prism-okaidia.css'

// SliderTab
import SliderTab from '../plugins/slider-tabs'

// Import selectors & action from setting store
import * as SettingSelector from "../store/setting/selectors";

// Redux Selector / Action
import { useSelector } from "react-redux";
import Default from "../layouts/dashboard/default";



const Index = () => {
  const appName = useSelector(SettingSelector.app_name);

    useEffect(() => {
      return () => {
        setTimeout(() => {
          Array.from(
            document.querySelectorAll('[data-toggle="slider-tab"]'),
            (elem) => {
              return new SliderTab(elem);
            }
          );
        }, 100);
      };
    });

    return (
        <Default />
    )
}

export default Index;
