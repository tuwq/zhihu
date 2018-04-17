<template>
  <div class="mask" v-show="write_idea_mask" @click.stop="cls_mask">
    <div class="mask-inner" @click.stop>
      <div class="idea-title">
        <span class="idea-icon"><i><svg width="16" height="16"><path d="M12.63 2.02V0h1.35v2.02H16v1.35h-2.02V5.4h-1.35V3.36H10.6V2.02h2.03zm-.17 4.9h1.7v4.76c0 1.5-.17 2.05-.46 2.6-.3.55-.73.98-1.28 1.27-.54.3-1.1.45-2.6.45h-5.5c-1.5 0-2.05-.16-2.6-.45-.55-.3-.98-.72-1.27-1.27-.3-.55-.45-1.1-.45-2.6v-5.5c0-1.5.16-2.06.45-2.6.3-.55.72-.98 1.27-1.28.55-.3 1.1-.45 2.6-.45H9.1v1.7H4.3c-1.12 0-1.46.05-1.8.24-.26.1-.45.3-.58.55-.2.35-.26.7-.26 1.8v5.5c0 1.13.07 1.47.26 1.8.13.27.32.46.58.6.34.18.68.25 1.8.25h5.5c1.12 0 1.46-.06 1.8-.25.27-.13.46-.32.6-.58.18-.34.24-.68.24-1.8V6.9zM8.6 6.7c.7-.16 1.45.06 1.98.6.83.83.83 2.2 0 3.04l-.03.03c-.84.85-2.2.85-3.04 0l-1.92-2c-.25-.24-.64-.24-.88 0l-.04.04c-.25.28-.25.7 0 .95.15.16.37.22.57.17.4-.1.82.18.9.58.1.4-.16.82-.57.9-.7.17-1.46-.04-1.98-.58-.83-.85-.83-2.2 0-3.06l.03-.02c.86-.85 2.2-.85 3.05 0L8.6 9.3c.24.25.63.25.87 0l.03-.02c.25-.26.25-.67 0-.93-.16-.15-.37-.2-.58-.17-.4.1-.8-.16-.9-.57-.1-.4.16-.8.57-.9z"/></svg></i>
          写想法
        </span>
      </div>
      <form class="idea-commit" enctype="multipart/form-data">
        <div class="idea-main">
          <span class="idea-avatar"><img src="../../../common/image/header/avatar.png" width="30" height="30"></span>
          <textarea class="idea-content" placeholder="分享你的想法"></textarea>
        </div>
        <div class="idea-footer">
            <button class="upload-button">
              <i><svg width="14" height="16"><path d="M18.094 2H15s-1-2-2-2H7C6 0 5 2 5 2H2C0 2 0 3.967 0 3.967V14c0 2 2.036 2 2.036 2H17c3 0 3-1.983 3-1.983V4c0-2-1.906-2-1.906-2zM10 12c-1.933 0-3.5-1.567-3.5-3.5S8.067 5 10 5s3.5 1.567 3.5 3.5S11.933 12 10 12zm0 1.5c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm7.5-8c-.552 0-1-.448-1-1s.448-1 1-1 1 .448 1 1-.448 1-1 1z"></path></svg></i>
              上传照片或视频
            </button>
            <input type="submit" class="idea-commitBtn" value="发布"/>
        </div>
      </form>
    </div> 
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapGetters,mapMutations} from 'vuex';
  export default {
    methods: {
      cls_mask() {
        this.setIdeaDisplay(false);
      },
      ...mapMutations({
        setIdeaDisplay: 'SET_WRITE_IDEA_MASK' 
      })
    },
    computed: {
      ...mapGetters([
        'write_idea_mask'
      ])
    },
  }
</script>

<style scoped lang="less" rel="stylesheet/less" type="text/less">
@import url('../cpLess/writeIdea.less');
</style>
