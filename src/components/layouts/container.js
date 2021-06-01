import React from "react"
import styles from "./container.module.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export const Container = ({title, children}) => {
    return (
        <div className={styles.default}>
            {title !== undefined &&
            <p className={styles.title}>{title}</p>}
            {children}
        </div>
    )
}

export const FlexContainer = ({title, children}) => {
    return (
        <div className={styles.flex}>
            {title !== undefined &&
            <p className={styles.title}>{title}</p>}
            {children}
        </div>
    )
}

export const SinglePaneContainer = ({children}) => {
    return (
        <div className={styles.singlePane}>
            {children}
        </div>
    )
}

export const TwoPaneContainer = ({children}) => {
    return (
        <div className={styles.twoPane}>
            {children}
        </div>
    )
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

    isExpandable() {
        return this.props.children.length > this.props.sizeLimit;
    }

    getHeaderIcon() {
        return this.state.expanded
            ? <FontAwesomeIcon icon="angle-up" size="1x" text="Close"/>
            : <FontAwesomeIcon icon="angle-down" size="1x" text="Open"/>
    }

    getButtonText() {
        return this.state.expanded
            ? "閉じる"
            : "他" + (this.props.children.length - this.props.sizeLimit).toString() + "件"
    }

    render() {
        if (this.props.children.length === 0) {
            return <FlexContainer/>
        }

        return (
            <Container>
                <button onClick={this.handleClick} className={styles.titleButton}>
                    <p className={styles.title}>
                        {this.props.title}
                        <span className={styles.subtitle}>{`（${this.props.children.length}件）`}</span>
                        {this.isExpandable() && this.getHeaderIcon()}
                    </p>
                </button>
                <FlexContainer>
                    <FlexContainer>
                        {this.filterChildren(this.props.children)}
                    </FlexContainer>
                    {this.isExpandable() &&
                    <button onClick={this.handleClick} className={styles.button}>
                        {this.getButtonText()}
                    </button>
                    }
                </FlexContainer>
            </Container>
        )
    }
}