import type * as Stitches from '@stitches/react'
import { createStitches, defaultThemeMap } from '@stitches/react'
import {globalTheme} from "./stitches.config";

export const defaultTheme = {
    ...globalTheme,
    space: {
        1: '0.25rem',
        2: '0.5rem',
        3: '1rem',
        4: '1.25rem',
        5: '1.5rem',
        6: '2rem',
        7: '3rem',
        8: '4rem',
        9: '5rem',
    },
    sizes: {
        1: '0.25rem',
        2: '0.5rem',
        3: '1rem',
        4: '1.25rem',
        5: '1.5rem',
        6: '2rem',
        7: '3rem',
        8: '4rem',
        9: '5rem',
    },
    fontSizes: {
        1: '0.75rem',
        2: '0.875rem',
        3: '1rem',
        4: '1.25rem',
        5: '1.5rem',
        6: '2rem',
        7: '2.5rem',
        8: '3rem',
    },
    shadows: {
        1: '0px 1px 2px rgba(16, 24, 40, 0.05)',
        2: '0px 4px 5px -2px rgba(16, 24, 40, 0.08), 0px 1px 3px -1px rgba(16, 24, 40, 0.04)',
        3: '0px 4px 8px -2px rgba(16, 24, 40, 0.1), 0px 2px 4px -2px rgba(16, 24, 40, 0.06)',
        4: '0px 12px 16px -4px rgba(16, 24, 40, 0.08), 0px 4px 6px -2px rgba(16, 24, 40, 0.03)',
        5: '0px 20px 24px -4px rgba(16, 24, 40, 0.08), 0px 8px 8px -4px rgba(16, 24, 40, 0.03)',
        6: '0px 24px 48px -12px rgba(16, 24, 40, 0.18)',
        7: '0px 32px 64px -12px rgba(16, 24, 40, 0.14)',
    },
    lineHeights: {
        none: 0,
        fit: 1,
        display: 1.25,
        button: 1.428571428571429,
        standard: 1,
    },
    letterSpacings: {
        normal: 'normal',
        caps: '0.025em',
    },
}

export const { styled, css, theme, createTheme, config } =
    createStitches({
        theme: defaultTheme,
        themeMap: {
            ...defaultThemeMap,
            size: 'space',
        },
        media: {
            bp1: '(min-width: 520px)',
            bp2: '(min-width: 900px)',
            bp3: '(min-width: 1200px)',
            bp4: '(min-width: 1800px)',
            motion: '(prefers-reduced-motion: no-preference)',
            hover: '(any-hover: hover)',
            dark: '(prefers-color-scheme: dark)',
            light: '(prefers-color-scheme: light)',
        },
        utils: {
            p: (value: Stitches.PropertyValue<'padding'>) => ({
                padding: value,
            }),
            pt: (value: Stitches.PropertyValue<'paddingTop'>) => ({
                paddingTop: value,
            }),
            pr: (value: Stitches.PropertyValue<'paddingRight'>) => ({
                paddingRight: value,
            }),
            pb: (value: Stitches.PropertyValue<'paddingBottom'>) => ({
                paddingBottom: value,
            }),
            pl: (value: Stitches.PropertyValue<'paddingLeft'>) => ({
                paddingLeft: value,
            }),
            px: (value: Stitches.PropertyValue<'paddingLeft'>) => ({
                paddingLeft: value,
                paddingRight: value,
            }),
            py: (value: Stitches.PropertyValue<'paddingTop'>) => ({
                paddingTop: value,
                paddingBottom: value,
            }),

            m: (value: Stitches.PropertyValue<'margin'>) => ({
                margin: value,
            }),
            mt: (value: Stitches.PropertyValue<'marginTop'>) => ({
                marginTop: value,
            }),
            mr: (value: Stitches.PropertyValue<'marginRight'>) => ({
                marginRight: value,
            }),
            mb: (value: Stitches.PropertyValue<'marginBottom'>) => ({
                marginBottom: value,
            }),
            ml: (value: Stitches.PropertyValue<'marginLeft'>) => ({
                marginLeft: value,
            }),
            mx: (value: Stitches.PropertyValue<'marginLeft'>) => ({
                marginLeft: value,
                marginRight: value,
            }),
            my: (value: Stitches.PropertyValue<'marginTop'>) => ({
                marginTop: value,
                marginBottom: value,
            }),

            bg: (value: Stitches.PropertyValue<'backgroundColor'>) => ({
                backgroundColor: value,
            }),

            br: (value: Stitches.PropertyValue<'borderRadius'>) => ({
                borderRadius: value,
            }),
            bbr: (value: Stitches.PropertyValue<'borderTopRightRadius'>) => ({
                borderBottomRightRadius: value,
                borderBottomLeftRadius: value,
            }),
            btr: (value: Stitches.PropertyValue<'borderTopRightRadius'>) => ({
                borderTopRightRadius: value,
                borderTopLeftRadius: value,
            }),
            blr: (value: Stitches.PropertyValue<'borderTopRightRadius'>) => ({
                borderTopLeftRadius: value,
                borderBottomLeftRadius: value,
            }),
            brr: (value: Stitches.PropertyValue<'borderTopRightRadius'>) => ({
                borderTopRightRadius: value,
                borderBottomRightRadius: value,
            }),

            size: (value: Stitches.PropertyValue<'width'>) => ({
                width: value,
                height: value,
            }),
        },
    })

