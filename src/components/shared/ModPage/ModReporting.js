import React, { useEffect } from "react";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/client";
import ReportedCard from "./ReportedCard";
import LoadingFullScreen from "../../loading/loading-full-screen";

const FETCH_FLAGGED = gql`
    query webGetFlagged($filter: FilterFindManyReportedContentInput) {
        web {
            reportContentPagination(filter: $filter, sort: REPORTERID_DESC) {
                items {
                    _id
                    reasonType
                    reportedContentStatus
                    userDescription
                    appealDescription
                    updatedAt
                    lastModeratorObject {
                        _id
                        username
                        profileImage {
                            original {
                                url
                            }
                        }
                    }
                    reporterObject {
                        _id
                        username
                        profileImage {
                            original {
                                url
                            }
                        }
                    }
                    biteObject {
                        _id
                        title
                        keywords
                        color
                        image {
                            original {
                                url
                            }
                        }
                        giphy {
                            gif
                        }
                        ownerObject {
                            _id
                            username
                            profileImage {
                                original {
                                    url
                                }
                            }
                        }
                        description
                        isCurated
                        transcription
                        favorited
                        userAudioQuality
                        userLocale
                        playCount
                        createdAt
                        updatedAt
                        userKeywords
                        userEmotion
                        userCategory
                        author
                        visibility
                        reportedContentIds
                        audienceRating
                        audio {
                            original {
                                url
                            }
                            mp3 {
                                url
                            }
                        }
                        lastCurator {
                            _id
                            username
                            profileImage {
                                original {
                                    url
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`;

const MOD_REPORT = gql`
    mutation updateModReport($record: moderateReportedContentInputType!) {
        web {
            reportModerateReportedContent(record: $record) {
                reportedContent {
                    _id
                    reasonType
                    reportedContentStatus
                    userDescription
                    appealDescription
                    updatedAt
                    lastModeratorObject {
                        _id
                        username
                        profileImage {
                            original {
                                url
                            }
                        }
                    }
                    reporterObject {
                        _id
                        username
                        profileImage {
                            original {
                                url
                            }
                        }
                    }
                    biteObject {
                        _id
                        title
                        keywords
                        color
                        image {
                            original {
                                url
                            }
                        }
                        giphy {
                            gif
                        }
                        ownerObject {
                            _id
                            username
                            profileImage {
                                original {
                                    url
                                }
                            }
                        }
                        description
                        isCurated
                        transcription
                        favorited
                        userAudioQuality
                        userLocale
                        playCount
                        createdAt
                        updatedAt
                        userKeywords
                        userEmotion
                        userCategory
                        author
                        visibility
                        reportedContentIds
                        audienceRating
                        audio {
                            original {
                                url
                            }
                            mp3 {
                                url
                            }
                        }
                        lastCurator {
                            _id
                            username
                            profileImage {
                                original {
                                    url
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`;

const ModReporting = props => {
    const { loading, error, data, refetch } = useQuery(FETCH_FLAGGED, {
        notifyOnNetworkStatusChange: true,
        fetchPolicy: "network-only",
    });

    // const [updateBiteInfo] = useMutation(UPDATE_BITE_INFO);
    const [updateReport] = useMutation(MOD_REPORT);

    useEffect(() => {
        let filter = [];
        if (props.listState === "FLAGGED") {
            filter = [
                { reportedContentStatus: "NONE" },
                { reportedContentStatus: "REPORTED" },
                { reportedContentStatus: "URGENT" },
            ];
        } else if (props.listState === "REVIEWED") {
            filter = [
                { reportedContentStatus: "REVIEWED_BLACKLISTED" },
                { reportedContentStatus: "REVIEWED_CLEAN" },
            ];
        } else if (props.listState === "APPEALS") {
            filter = [
                { reportedContentStatus: "APPEALING" },
                { reportedContentStatus: "REVIEWED_APPEALED" },
            ];
        }
        let myVars = { filter: { OR: filter }, sort: "REPORTERID_DESC" };
        refetch(myVars);
    }, [props]);

    if (loading) return <LoadingFullScreen />;
    if (error) return <></>;
    if (data)
        return (
            <>
                {data.web.reportContentPagination.items.map(reportItem => {
                    if (reportItem.biteObject) {
                        return (
                            <ReportedCard
                                key={`report-${
                                    reportItem.biteObject._id
                                }-${Math.random(1, 100)}`}
                                bite={reportItem.biteObject}
                                reportItem={reportItem}
                                listState={props.listState}
                                updateReport={variables => {
                                    updateReport(variables);
                                }}
                            />
                        );
                    }
                })}
            </>
        );
};

export default ModReporting;
