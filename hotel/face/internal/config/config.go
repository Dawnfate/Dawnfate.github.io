package config

import "github.com/zeromicro/go-zero/rest"

type Config struct {
	rest.RestConf
	DataSourceName string
	TenXunCloud struct{
		SecretId string
		SecretKey string
		Region string
	}
	//FaceParam struct{
	//	GroupId string
	//	ImageBase64 string
	//	MaxFaceNum int
	//	MinFaceSize int
	//	NeedPersonInfo int
	//	QualityControl int
	//	FaceMatchThreshold float32
	//	NeedRotateDetection int
	//}
}
