package dto

type RequestReport struct {
	ReportID  string `json:"id"`
	AccountID string `json:"account_id"`
	InitDate  string `json:"start_date"`
	EndDate   string `json:"end_date"`
}

type ResponseReport struct {
	ID      string `json:"id"`
	FileURL string `json:"file_url"`
	Status  string `json:"status"`
}
