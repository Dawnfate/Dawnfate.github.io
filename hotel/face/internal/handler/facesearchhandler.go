package handler

import (
	"net/http"

	"face/internal/logic"
	"face/internal/svc"
	"face/internal/types"
	"github.com/zeromicro/go-zero/rest/httpx"
)

func faceSearchHandler(svcCtx *svc.ServiceContext) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var req types.FaceSearchReq
		if err := httpx.Parse(r, &req); err != nil {
			httpx.Error(w, err)
			return
		}

		l := logic.NewFaceSearchLogic(r.Context(), svcCtx)
		resp, err := l.FaceSearch(req)
		if err != nil {
			httpx.Error(w, err)
		} else {
			httpx.OkJson(w, resp)
		}
	}
}
