package logic

import (
	"context"
	"github.com/tencentcloud/tencentcloud-sdk-go/tencentcloud/common"
	"github.com/tencentcloud/tencentcloud-sdk-go/tencentcloud/common/errors"
	"github.com/tencentcloud/tencentcloud-sdk-go/tencentcloud/common/profile"
	iai "github.com/tencentcloud/tencentcloud-sdk-go/tencentcloud/iai/v20200303"

	"face/internal/svc"
	"face/internal/types"
	"fmt"

	"github.com/zeromicro/go-zero/core/logx"
)
//解析json

type Responses struct {
	Response struct {
		FaceModelVersion string `json:"FaceModelVersion"`
		FaceNum          int    `json:"FaceNum"`
		RequestID        string `json:"RequestId"`
		Results          []struct {
			Candidates []struct {
				FaceID           string `json:"FaceId"`
				Gender           int    `json:"Gender"`
				PersonGroupInfos []struct {
					GroupID              string        `json:"GroupId"`
					PersonExDescriptions []interface{} `json:"PersonExDescriptions"`
				} `json:"PersonGroupInfos"`
				PersonID   string `json:"PersonId"`
				PersonName string `json:"PersonName"`
				Score      int    `json:"Score"`
			} `json:"Candidates"`
			FaceRect struct {
				Height int `json:"Height"`
				Width  int `json:"Width"`
				X      int `json:"X"`
				Y      int `json:"Y"`
			} `json:"FaceRect"`
			RetCode int `json:"RetCode"`
		} `json:"Results"`
	} `json:"Response"`
}


type FaceSearchLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

func NewFaceSearchLogic(ctx context.Context, svcCtx *svc.ServiceContext) FaceSearchLogic {
	return FaceSearchLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *FaceSearchLogic) FaceSearch(req types.FaceSearchReq) (resp *types.FaceSearchResp, err error) {
	// todo: add your logic here and delete this line
	if req.Imagebase64 == "" {
		return &types.FaceSearchResp{
		},err
	}
	credential := common.NewCredential(
		l.svcCtx.Config.TenXunCloud.SecretId,
		l.svcCtx.Config.TenXunCloud.SecretKey,
	)
	cpf := profile.NewClientProfile()
	cpf.HttpProfile.Endpoint = "iai.tencentcloudapi.com"
	client, _ := iai.NewClient(credential,l.svcCtx.Config.TenXunCloud.Region, cpf)

	request := iai.NewSearchFacesRequest()
	request.GroupIds = common.StringPtrs([]string{ "handsome" })
	request.Image = common.StringPtr(req.Imagebase64)
	//request.Url = common.StringPtr("1")
	request.MaxFaceNum = common.Uint64Ptr(1)
	request.MinFaceSize = common.Uint64Ptr(80)
	request.MaxPersonNum = common.Uint64Ptr(1)
	request.NeedPersonInfo = common.Int64Ptr(1)
	request.QualityControl = common.Uint64Ptr(3)
	request.FaceMatchThreshold = common.Float64Ptr(80)
	request.NeedRotateDetection = common.Uint64Ptr(1)
	response, err := client.SearchFaces(request)
	if _, ok := err.(*errors.TencentCloudSDKError); ok {
		fmt.Printf("An API error has returned: %s", err)
		return &types.FaceSearchResp{},nil
	}
	//if err != nil {
	//	panic(err)
	//}

	fmt.Printf("%s", response.ToJsonString())
	fmt.Println()
	name := response.Response.Results[0].Candidates[0].PersonName
	fmt.Printf("%s", name)
	fmt.Println()
	nicket := *name
	fmt.Printf("%s",nicket)
	fmt.Println()
	return &types.FaceSearchResp{
		*name,
	},nil


}
/*{
"Response": {
"FaceModelVersion": "3.0",
"FaceNum": 1,
"RequestId": "8f21cce0-b098-4927-bb55-1d0f72fc73e3",
"Results": [
{
"Candidates": [
{
"FaceId": "4625634744789426084",
"Gender": 1,
"PersonGroupInfos": [
{
"GroupId": "handsome",
"PersonExDescriptions": []
}
],
"PersonId": "1",
"PersonName": "李东福",
"Score": 100
}
],
"FaceRect": {
"Height": 660,
"Width": 491,
"X": 287,
"Y": 291
},
"RetCode": 0
}
]
}
}*/

