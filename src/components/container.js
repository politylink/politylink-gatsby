import React from "react"
import styles from "./container.module.css"

export const Container = ({children}) => {
    return <div className={styles.default}>{children}</div>
}

export const FlexContainer = ({children}) => {
    return <div className={styles.flex}>{children}</div>
}

export class ExpandableContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            expanded: (typeof window !== 'undefined' && localStorage.getItem(this.props.localStorageKey) === 'true') || false
        }
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        const newVal = !this.state.expanded
        typeof window !== 'undefined' && localStorage.setItem(this.props.localStorageKey, newVal.toString());
        this.setState({expanded: newVal})
    }

    filterChildren(children) {
        return this.state.expanded
            ? children
            : children.slice(0, this.props.sizeLimit);
    }

    getButtonText() {
        return this.state.expanded
            ? "閉じる"
            : "他" + (this.props.children.length - this.props.sizeLimit).toString() + "件"
    }

    render() {
        return (
            <FlexContainer>
                <FlexContainer>
                    {this.filterChildren(this.props.children)}
                </FlexContainer>
                {this.props.children.length > this.props.sizeLimit &&
                <button onClick={this.handleClick} className={styles.button}>
                    {this.getButtonText()}
                </button>
                }
            </FlexContainer>
        )
    }
}