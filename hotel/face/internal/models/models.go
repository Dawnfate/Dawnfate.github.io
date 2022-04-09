package models

import (
	"errors"
	//"zeroDemo2/internal/utils"
	"gorm.io/gorm"
)

type Guest struct {
	gorm.Model
	Name string `gorm:"type:varchar(8)"`
	Passwd string `gorm:"type:varchar(64)"`
}

type Order struct {
	gorm.Model
	Name string `gorm:"type:varchar(8)"`
	Passwd string `gorm:"type:varchar(64)"`
}
//在创建前检验验证一下密码的有效性
func (u *User) BeforeCreate(db *gorm.DB) error {
	if len(u.Passwd) < 6 {
		return errors.New("密码太简单了")
	}
	//对密码进行加密存储
	u.Passwd = utils.Password(u.Passwd)
	return nil
}