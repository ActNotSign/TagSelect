TagSelect
=================================== 
基于jQuery的标签插入生成控件。

使用方法
-----------------------------------
### 创建控件
    /**
     * @param title       string 设置提示title
     * @param definedTags string 设置缺省输入tag
     * @param tags        string 设置推荐tags
     */ 
    $('.tagbox').createSelectTagBox(
      {
        title : '告诉我们您兴趣领域吧',
        definedTags : '百读 伯乐 阿三',
        tags : '垃圾 小萝莉 奥特曼 那笔小新 神笔马里 老大不小 东拉西扯 恶语相加 老挝 王老吉 加多边'
      }
    );
    
### 获取输入内容
    /**
     * @return string
     */
    $('.tagbox').getTags();

Tips
-----------------------------------
空格为Tag插入标识，所以单个Tag中不能存在空格。
    

