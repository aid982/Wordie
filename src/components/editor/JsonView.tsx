'use client'
import React, { useState } from 'react'
import ReactJson from 'react-json-view';

type Props = {}

function JsonView({ }: Props) {
    const [jsonData, setJsonData] = useState({})

    return (
        <ReactJson
            src={jsonData}
            onEdit={(edit) => {
                console.log(edit.updated_src);
            }}
            onAdd={(add) => {
                // Handle the addition of a new key-value pair
            }}
            onDelete={(del) => {
                // Handle the deletion of a key-value pair
            }}
        />
    )
}

export default JsonView