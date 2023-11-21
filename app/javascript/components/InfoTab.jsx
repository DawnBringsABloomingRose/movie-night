import React from "react";
import { Descriptions } from "antd";

class InfoTab extends React.Component {

    constructor(props) {
        super(props);
        this.descriptions = this.setDescriptions(props.info);
    }

    setDescriptions(info) {
        try {
        var genres = info.genres.map(genre => genre.name+ ','); }
        catch(e) {}

        const items = [
            {
                key: '1', 
                label: 'Genres',
                children: <>{genres}</>,
                span: 2,
            },
            {
                key: '2', 
                label: 'Budget',
                children: info.budget,
            },
            {
                key: '3', 
                label: 'Revenue',
                children: info.revenue,
            },
            {
                key: '4', 
                label: 'Original Title',
                children: info.original_title,
            },
            {
                key: '5', 
                label: 'Original Language',
                children: info.orginal_language,
            },
            {
                key: '6', 
                label: 'Tagline',
                children: info.tagline,
            },
            {
                key: '7', 
                label: 'Votes',
                children: info.vote_count,
            },
            {
                key: '8', 
                label: 'Vote average',
                children: info.vote_average + '/10',
            },
        ]
        return items;
    }

    render() {
        return <>
            <Descriptions bordered items={this.descriptions} column="2"/>
        </>
    }
}

export default InfoTab;