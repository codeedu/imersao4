package repository

import (
	"encoding/json"
	"github.com/codeedu/imersao4-reports/dto"
	"github.com/elastic/go-elasticsearch/v8"
	"os"
	"strconv"
	"strings"
	"time"
)

type TransactionElasticRepository struct {
	Client elasticsearch.Client
}

func (t TransactionElasticRepository) Search(reportID string, accountID string, initDate string, endDate string) (dto.SearchResponse, error) {
	layout := "2006-01-02"
	initDateTimestamp, err := time.Parse(layout, initDate)
	if err != nil {
		return dto.SearchResponse{}, err
	}
	endDateTimestamp, err := time.Parse(layout, endDate)
	if err != nil {
		return dto.SearchResponse{}, err
	}

	data := `
{"query": {
    "bool": {
      "must": [
        {
          "match": {
            "account_id": "` + accountID + `"
          }
        }
      ],
      "filter": [
        {
          "range" : {
            "payment_date": {
                 "gte": ` + strconv.FormatInt(initDateTimestamp.Unix()*1000, 10) + `,
                  "lte": ` + strconv.FormatInt(endDateTimestamp.Unix()*1000, 10) + ` 
            }
          }
        }
      ]
    }
  }
}
`
	response, err := t.Client.Search(
		t.Client.Search.WithIndex(os.Getenv("ElasticIndex")),
		t.Client.Search.WithBody(strings.NewReader(data)),
		t.Client.Search.WithTrackTotalHits(true),
	)
	if err != nil {
		return dto.SearchResponse{}, err
	}
	defer response.Body.Close()
	searchResponse := dto.SearchResponse{}
	err = json.NewDecoder(response.Body).Decode(&searchResponse)
	if err != nil {
		return dto.SearchResponse{}, err
	}
	searchResponse.ReportID = reportID
	searchResponse.AccountID = accountID
	searchResponse.InitDate = initDate
	searchResponse.EndDate = endDate
	return searchResponse, nil
}
