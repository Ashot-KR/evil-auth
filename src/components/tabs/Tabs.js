import css from './Tabs.module.css'
import {
  Children,
  cloneElement,
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react'
import cc from 'classcat'
import useClassNameMemo from '../../hooks/useClassNameMemo'

const TabsContext = createContext({})

const Tabs = ({ children, defaultTab, tab, ...props }) => {
  const [activeTab, setActiveTab] = useState(tab || defaultTab || 0)

  useEffect(() => {
    if (tab) {
      setActiveTab(tab)
    }
  }, [tab])

  const setTab = useCallback((tab) => {
    setActiveTab(tab)
  }, [setActiveTab])

  return (
    <TabsContext.Provider
      value={{
        setTab,
        activeTab
      }}
    >
      <div {...props}>{children}</div>
    </TabsContext.Provider>
  )
}

Tabs.defaultProps = {
  defaultTab: 0
}

export default Tabs

export const TabsList = ({ children, ...props }) => {
  const tabsContext = useContext(TabsContext)
  const tabsRef = useRef([])
  const [indicatorStyle, setIndicatorStyle] = useState({left: 0, width: 0})

  const chldrn = Children.map(children, (child, i) => {
    const props = {
      ref: (node) => tabsRef.current.push(node),
      className: cc([child.props.className, { [css.tabActive]: i === tabsContext.activeTab }])
    }

    if (child.props.onClick) {
      props.onClick = child.props.onClick
    } else {
      props.onClick = () => {
        tabsContext.setTab(i)
      }
    }

    return cloneElement(child, props)
  })

  useEffect(() => {
    const activeTab = tabsRef.current[tabsContext.activeTab]

    if (activeTab) {
      setIndicatorStyle({
        left: activeTab.offsetLeft + 'px',
        width: activeTab.offsetWidth + 'px'
      })
    }
  }, [tabsContext.activeTab])

  return (
    <div {...props} className={css.tabsList}>{chldrn} <div style={indicatorStyle} className={css.activeIndicator} /></div>
  )
}

export const Tab = forwardRef(({ className, ...props }, ref) => {
  const clsName = useClassNameMemo(() => {
    return [css.tab, className]
  }, [className])
  return <div ref={ref} className={clsName} {...props} />
})

Tab.displayName = 'Tab'

export const TabsBody = ({ children }) => {
  const ctx = useContext(TabsContext)

  return children(ctx.activeTab)
}
