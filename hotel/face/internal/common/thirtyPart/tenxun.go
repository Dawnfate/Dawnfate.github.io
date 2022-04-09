package thirtyPart

import (
	"face/internal/config"
	_ "face/internal/config"
	"fmt"
	"github.com/tencentcloud/tencentcloud-sdk-go/tencentcloud/common"
	"github.com/tencentcloud/tencentcloud-sdk-go/tencentcloud/common/errors"
	"github.com/tencentcloud/tencentcloud-sdk-go/tencentcloud/common/profile"
	iai "github.com/tencentcloud/tencentcloud-sdk-go/tencentcloud/iai/v20200303"
)

func FaceSearch(c config.Config) {

	credential := common.NewCredential(
		c.TenXunCloud.SecretId,
		"SecretKey",
	)
	cpf := profile.NewClientProfile()
	cpf.HttpProfile.Endpoint = "iai.tencentcloudapi.com"
	client, _ := iai.NewClient(credential, "", cpf)

	request := iai.NewSearchFacesRequest()



	response, err := client.SearchFaces(request)
	if _, ok := err.(*errors.TencentCloudSDKError); ok {
		fmt.Printf("An API error has returned: %s", err)
		return
	}
	if err != nil {
		panic(err)
	}
	fmt.Printf("%s", response.ToJsonString())
}
