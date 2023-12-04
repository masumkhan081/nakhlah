export function handleGetItem(data,learningTitle) {
    return  data.map(item => {
        const { id, attributes } = item;
        if (learningTitle=== 'purpose') {
            var { purpose, icon } = attributes;
        } else if (learningTitle === 'level') {
            var { level, icon } = attributes;
        } else if (learningTitle === "title") {
            var { title, subtitle, icon } = attributes;
        } else {
            var { goal, time } = attributes;
        }

        if (learningTitle !== 'goal') {
            var formats = {
                large: icon.data?.attributes?.formats.large?.url,
                small: icon.data?.attributes?.formats.small?.url,
                medium: icon.data?.attributes?.formats.medium?.url,
                thumbnail: icon.data?.attributes?.formats.thumbnail?.url
            };
        }

        if (learningTitle === 'purpose') {
            return {
                id,
                purpose,
                formats
            }
        } else if (learningTitle === 'level') {
            return {
                id,
                level,
                formats
            }
        } else if (learningTitle === "title") {
            return {
                id,
                title,
                subtitle,
                formats
            }
        } else {
            return {
                id,
                goal,
                time
            };
        }
    })
}