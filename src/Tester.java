import com.taobao.rigel.rap.common.Patterns;

/**
 * Created by Bosn on 2014/8/16.
 */
public class Tester {
    public static void main(String[] args) {
        System.out.println("abcdef_23489*&@^#*&@^#ajsdf".replaceAll(Patterns.ILLEGAL_NAME_CHAR, ""));
    }
}
